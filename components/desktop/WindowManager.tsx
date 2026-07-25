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
          const baseY = Math.max(40, Math.round((window.innerHeight - windowHeight) / 2));
          const nudge = state.windows.length * 24; // 0 for first, 24 for second, etc.
          defaultPos = { x: baseX + nudge, y: baseY + nudge };
        } else {
          defaultPos = { x: 120 + state.windows.length * 24, y: 120 + state.windows.length * 24 };
        }
      const newWin: WindowData = {
        id: action.payload.id,
        title: action.payload.title,
        contentType: action.payload.contentType,
        position: defaultPos,
        zIndex: z,
      };
      return { ...state, windows: [...state.windows, newWin], focusedWindowId: newWin.id, zCounter: z };
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
  };

  return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
};

export function useDesktopContext() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error('useDesktopContext must be used within WindowManagerProvider');
  return ctx;
}
