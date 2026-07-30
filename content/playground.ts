export type WorkItem = {
  id: string;
  title?: string;
  thumbnail: string; // public path to image, e.g. /playground/thumb-1.png
};

export const PLAYGROUND_ITEMS: WorkItem[] = [
  { id: 'pg-1', title: 'Play Item 1', thumbnail: '/playground/thumb-1.png' },
  { id: 'pg-2', title: 'Play Item 2', thumbnail: '/playground/thumb-2.mp4' },
  { id: 'pg-3', title: 'Play Item 3', thumbnail: '/playground/thumb-3.mp4' },
  { id: 'pg-4', title: 'Play Item 4', thumbnail: '/playground/thumb-4.png' },
  { id: 'pg-5', title: 'Play Item 5', thumbnail: '/playground/thumb-5.mp4' },
  { id: 'pg-6', title: 'Play Item 6', thumbnail: '/playground/thumb-6.png' },
  { id: 'pg-7', title: 'Play Item 7', thumbnail: '/playground/thumb-7.png' },
  { id: 'pg-8', title: 'Play Item 8', thumbnail: '/playground/thumb-8.mp4' },
  { id: 'pg-9', title: 'Play Item 9', thumbnail: '/playground/thumb-9.png' },
  { id: 'pg-10', title: 'Play Item 10', thumbnail: '/playground/thumb-10.mp4' },
];

export default PLAYGROUND_ITEMS;
