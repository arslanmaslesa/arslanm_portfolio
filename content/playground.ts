export type WorkItem = {
  id: string;
  title?: string;
  thumbnail: string; // public path to image, e.g. /playground/thumb-1.png
};

export const PLAYGROUND_ITEMS: WorkItem[] = [
  { id: 'pg-1', title: 'Play Item 1', thumbnail: '/playground/thumb-1.png' },
  { id: 'pg-2', title: 'Play Item 2', thumbnail: '/playground/thumb-2.png' },
  { id: 'pg-3', title: 'Play Item 3', thumbnail: '/playground/thumb-3.png' },
  { id: 'pg-4', title: 'Play Item 4', thumbnail: '/playground/thumb-4.png' },
];

export default PLAYGROUND_ITEMS;
