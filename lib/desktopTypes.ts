export type Position = { x: number; y: number };

export type IconData = {
  id: string;
  label: string;
  iconColor: string;
  defaultPosition: Position;
  contentType: 'work' | 'playground' | 'about' | string;
};

export type WindowData = {
  id: string;
  title: string;
  contentType: string;
  position: Position;
  zIndex: number;
  viewMode?: 'grid' | 'icons';
  activeProjectId?: string;
  forwardProjectId?: string;
  forwardProjectTitle?: string;
};

export type DesktopState = {
  windows: WindowData[];
  iconPositions: Record<string, Position>;
  focusedWindowId: string | null;
  selectedIconId: string | null;
  zCounter: number;
  savedViewModes?: Record<string, 'grid' | 'icons'>;
};

export type DesktopAction =
  | { type: 'OPEN_WINDOW'; payload: { id: string; title: string; contentType: string } }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'FOCUS_WINDOW'; payload: { id: string } }
  | { type: 'MOVE_ICON'; payload: { id: string; position: Position } }
  | { type: 'MOVE_WINDOW'; payload: { id: string; position: Position } }
  | { type: 'SELECT_ICON'; payload: { id: string | null } }
  | { type: 'SET_WINDOW_VIEW'; payload: { id: string; viewMode: 'grid' | 'icons' } }
  | { type: 'OPEN_WORK_PROJECT'; payload: { projectId: string; title: string } }
  | { type: 'RETURN_TO_WORK_FOLDER' }
  | { type: 'GO_FORWARD_TO_WORK_PROJECT' };
