export type WorkItem = {
  id: string;
  title?: string;
  thumbnail: string; // public path to image, e.g. /about/thumb-1.png
};

export const ABOUT_ITEMS: WorkItem[] = [
  { id: 'about-1', title: 'Me', thumbnail: '/about/thumb-1.png' },
  { id: 'about-2', title: 'Certifications', thumbnail: '/about/thumb-2.png' },
  { id: 'about-3', title: 'Inspirations', thumbnail: '/about/thumb-3.png' },
  { id: 'about-4', title: 'Tools', thumbnail: '/about/thumb-4.png' },
];

export default ABOUT_ITEMS;
