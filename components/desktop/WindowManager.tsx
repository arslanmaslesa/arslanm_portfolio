"use client";

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { IconData, DesktopState, DesktopAction, WindowData, Position } from '../../lib/desktopTypes';
import { DESKTOP_ICONS } from '../../content/icons';

const ICON_POS_STORAGE_KEY = 'desktop_icon_positions_v1';

type DesktopContextValue = DesktopState & {
  icons: IconData[];
  openWindow: (id: string, title?: string, contentType?: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveIcon: (id: string, position: Position) => void;
  moveWindow: (id: string, position: Position) => void;
  selectIcon: (id: string | null) => void;
  setWindowView: (id: string, viewMode: 'grid' | 'icons') => void;
  openWorkProject: (projectId: string, title: string) => void;
  returnToWorkFolder: () => void;
  goForwardToWorkProject: () => void;
};

const DesktopContext = createContext<DesktopContextValue | undefined>(undefined);

function buildInitialIconPositions(): Record<string, Position> {
  const map: Record<string, Position> = {};
  DESKTOP_ICONS.forEach((i) => (map[i.id] = i.defaultPosition));
  return map;
}

const initialState: DesktopState = {
  windows: [],
  iconPositions: buildInitialIconPositions(),
  focusedWindowId: null,
  selectedIconId: null,
  // Start zCounter high so windows are rendered above icons by default
  zCounter: 1000,
  // default view presets on first load
  savedViewModes: {
    work: 'grid',
    about: 'icons',
    playground: 'grid',
  },
};

function reducer(state: DesktopState, action: DesktopAction): DesktopState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const exists = state.windows.find((w) => w.id === action.payload.id);
      if (exists) {
        // bring to front
        const z = state.zCounter + 1;
        return {
          ...state,
          windows: state.windows.map((w) => (w.id === exists.id ? { ...w, zIndex: z } : w)),
          focusedWindowId: exists.id,
          zCounter: z,
        };
      }

        const z = state.zCounter + 1;
        let defaultPos: Position;
        // Center base for all windows, then nudge each subsequent window
        if (typeof window !== 'undefined') {
          const windowWidth = Math.min(Math.round(window.innerWidth * 0.92), 800);
          const windowHeight = 520; // match Window component height
          const baseX = Math.max(40, Math.round((window.innerWidth - windowWidth) / 2));
          // shift the centered Y upward by `centerYOffset` pixels
          const centerYOffset = 40; // push center up by 40px
          const baseY = Math.max(20, Math.round((window.innerHeight - windowHeight) / 2) - centerYOffset);
          const nudge = state.windows.length * 24; // 0 for first, 24 for second, etc.
          defaultPos = { x: baseX + nudge, y: baseY + nudge };
        } else {
          defaultPos = { x: 120 + state.windows.length * 24, y: 120 + state.windows.length * 24 };
        }
      // Determine view mode: prefer saved preset, otherwise use sensible default per contentType
      const preset = state.savedViewModes && state.savedViewModes[action.payload.id];
      const defaultViewForType =
        action.payload.contentType === 'work' ? 'grid' : action.payload.contentType === 'about' || action.payload.contentType === 'playground' ? 'icons' : 'grid';

      const newWin: WindowData = {
        id: action.payload.id,
        title: action.payload.title,
        contentType: action.payload.contentType,
        position: defaultPos,
        zIndex: z,
        viewMode: (preset as any) ?? (defaultViewForType as any),
      };
      return { ...state, windows: [...state.windows, newWin], focusedWindowId: newWin.id, zCounter: z };
    }

    case 'SET_WINDOW_VIEW': {
      return {
        ...state,
        windows: state.windows.map((w) => (w.id === action.payload.id ? { ...w, viewMode: action.payload.viewMode } : w)),
        savedViewModes: { ...(state.savedViewModes ?? {}), [action.payload.id]: action.payload.viewMode },
      };
    }
    case 'OPEN_WORK_PROJECT': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === 'work'
            ? {
                ...w,
                title: action.payload.title,
                activeProjectId: action.payload.projectId,
                forwardProjectId: undefined,
                forwardProjectTitle: undefined,
              }
            : w,
        ),
      };
    }
    case 'RETURN_TO_WORK_FOLDER': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === 'work'
            ? {
                ...w,
                title: 'Work',
                forwardProjectId: w.activeProjectId,
                forwardProjectTitle: w.title,
                activeProjectId: undefined,
              }
            : w,
        ),
      };
    }
    case 'GO_FORWARD_TO_WORK_PROJECT': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === 'work' && w.forwardProjectId
            ? {
                ...w,
                title: w.forwardProjectTitle ?? w.forwardProjectId,
                activeProjectId: w.forwardProjectId,
                forwardProjectId: undefined,
                forwardProjectTitle: undefined,
              }
            : w,
        ),
      };
    }
    case 'CLOSE_WINDOW': {
      const windows = state.windows.filter((w) => w.id !== action.payload.id);
      const focused = state.focusedWindowId === action.payload.id ? (windows.length ? windows[windows.length - 1].id : null) : state.focusedWindowId;
      return { ...state, windows, focusedWindowId: focused };
    }
    case 'FOCUS_WINDOW': {
      const z = state.zCounter + 1;
      return {
        ...state,
        windows: state.windows.map((w) => (w.id === action.payload.id ? { ...w, zIndex: z } : w)),
        focusedWindowId: action.payload.id,
        zCounter: z,
      };
    }
    case 'MOVE_ICON': {
      const newPositions = { ...state.iconPositions, [action.payload.id]: action.payload.position };
      return { ...state, iconPositions: newPositions };
    }
    case 'MOVE_WINDOW': {
      return { ...state, windows: state.windows.map((w) => (w.id === action.payload.id ? { ...w, position: action.payload.position } : w)) };
    }
    case 'SELECT_ICON': {
      return { ...state, selectedIconId: action.payload.id };
    }
    default:
      return state;
  }
}

export const WindowManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, iconPositions: {} });

  const openWindow = (id: string, title?: string, contentType?: string) => dispatch({ type: 'OPEN_WINDOW', payload: { id, title: title ?? id, contentType: contentType ?? id } });
  const setWindowView = (id: string, viewMode: 'grid' | 'icons') => dispatch({ type: 'SET_WINDOW_VIEW', payload: { id, viewMode } });
  const openWorkProject = (projectId: string, title: string) => dispatch({ type: 'OPEN_WORK_PROJECT', payload: { projectId, title } });
  const returnToWorkFolder = () => dispatch({ type: 'RETURN_TO_WORK_FOLDER' });
  const goForwardToWorkProject = () => dispatch({ type: 'GO_FORWARD_TO_WORK_PROJECT' });
  const closeWindow = (id: string) => dispatch({ type: 'CLOSE_WINDOW', payload: { id } });
  const focusWindow = (id: string) => dispatch({ type: 'FOCUS_WINDOW', payload: { id } });
  const moveIcon = (id: string, position: Position) => dispatch({ type: 'MOVE_ICON', payload: { id, position } });
  const moveWindow = (id: string, position: Position) => dispatch({ type: 'MOVE_WINDOW', payload: { id, position } });
  const selectIcon = (id: string | null) => dispatch({ type: 'SELECT_ICON', payload: { id } });

  const value: DesktopContextValue = {
    ...state,
    icons: DESKTOP_ICONS,
    openWindow,
    closeWindow,
    focusWindow,
    moveIcon,
    moveWindow,
    selectIcon,
    setWindowView,
    openWorkProject,
    returnToWorkFolder,
    goForwardToWorkProject,
  };

  return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
};

export function useDesktopContext() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error('useDesktopContext must be used within WindowManagerProvider');
  return ctx;
}
