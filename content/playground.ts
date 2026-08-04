import type { GridItem } from '../lib/gridItemTypes';

export type WorkItem = GridItem;

export const PLAYGROUND_ITEMS: WorkItem[] = [
  { id: 'pg-1', title: 'Play Item 1', thumbnail: '/playground/thumb-1.png', interaction: 'nonClickable' },
  { id: 'pg-2', title: 'Play Item 2', thumbnail: '/playground/thumb-2.mp4', interaction: 'nonClickable' },
  { id: 'pg-3', title: 'Play Item 3', thumbnail: '/playground/thumb-3.mp4', interaction: 'nonClickable' },
  { id: 'pg-4', title: 'Play Item 4', thumbnail: '/playground/thumb-4.png', interaction: 'nonClickable' },
  { id: 'pg-5', title: 'Play Item 5', thumbnail: '/playground/thumb-5.mp4', interaction: 'nonClickable' },
  { id: 'pg-6', title: 'Play Item 6', thumbnail: '/playground/thumb-6.png', interaction: 'nonClickable' },
  { id: 'pg-7', title: 'Play Item 7', thumbnail: '/playground/thumb-7.png', interaction: 'nonClickable' },
  { id: 'pg-8', title: 'Play Item 8', thumbnail: '/playground/thumb-8.mp4', interaction: 'nonClickable' },
  { id: 'pg-9', title: 'Play Item 9', thumbnail: '/playground/thumb-9.png', interaction: 'nonClickable' },
  { id: 'pg-10', title: 'Play Item 10', thumbnail: '/playground/thumb-10.mp4', interaction: 'nonClickable' },
];

export default PLAYGROUND_ITEMS;
