export type WorkItem = {
  id: string;
  title?: string;
  thumbnail: string; // public path to image, e.g. /about/thumb-1.png
};

export const ABOUT_ITEMS: WorkItem[] = [
  { id: 'about-1', title: 'About Item 1', thumbnail: '/about/thumb-1.png' },
  { id: 'about-2', title: 'About Item 2', thumbnail: '/about/thumb-2.png' },
  { id: 'about-3', title: 'About Item 3', thumbnail: '/about/thumb-3.png' },
];

export default ABOUT_ITEMS;
