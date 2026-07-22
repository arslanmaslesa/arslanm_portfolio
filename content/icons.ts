import type { IconData } from '../lib/desktopTypes';

export const DESKTOP_ICONS: IconData[] = [
  {
    id: 'work',
    label: 'Work',
    iconColor: 'bg-blue-400',
    defaultPosition: { x: 350, y: 170 },
    contentType: 'work',
  },
  {
    id: 'playground',
    label: 'Playground',
    iconColor: 'bg-pink-400',
    defaultPosition: { x: 200, y: 340 },
    contentType: 'playground',
  },
  {
    id: 'about',
    label: 'About Me',
    iconColor: 'bg-slate-800',
    defaultPosition: { x: 400, y: 440 },
    contentType: 'about',
  },
];
