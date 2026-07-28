export type WorkItem = {
  id: string;
  title?: string;
  thumbnail: string; // public path to image, e.g. /work/thumb-1.png
};

export const WORK_ITEMS: WorkItem[] = [
  { id: 'project-1', title: 'Project 1', thumbnail: '/work/thumb-1.mp4' },
  { id: 'project-2', title: 'Project 2', thumbnail: '/work/thumb-2.png' },
  { id: 'project-3', title: 'Project 3', thumbnail: '/work/thumb-3.mp4' },
  { id: 'project-4', title: 'Project 4', thumbnail: '/work/thumb-4.mp4' },
  { id: 'project-5', title: 'Project 5', thumbnail: '/work/thumb-5.png' },
  { id: 'project-6', title: 'Project 6', thumbnail: '/work/thumb-6.png' },
];

export default WORK_ITEMS;
