import type { GridItem } from '../lib/gridItemTypes';

export type WorkItem = GridItem;

export const ABOUT_ITEMS: WorkItem[] = [
  { id: 'about-1', title: 'Me', gridThumbnail: '/about/thumb-1.png', iconThumbnail: '/about/thumb-1.png' },
  { id: 'about-2', title: 'Certifications', gridThumbnail: '/about/thumb-2.png', iconThumbnail: '/about/thumb-2.png' },
  { id: 'about-3', title: 'Inspirations', gridThumbnail: '/about/thumb-3.png', iconThumbnail: '/about/thumb-3.png' },
  { id: 'about-4', title: 'Tools', gridThumbnail: '/about/thumb-4.png', iconThumbnail: '/about/thumb-4.png' },
];

export const ABOUT_TOOLS_ITEMS: WorkItem[] = [
  { id: 'tool-figma', title: 'Figma', gridThumbnail: '/about/figma.png', iconThumbnail: '/about/figma.png', interaction: 'nonClickable' },
  { id: 'tool-framer', title: 'Framer', gridThumbnail: '/about/tools-2.png', iconThumbnail: '/about/tools-2.png', interaction: 'nonClickable' },
  { id: 'tool-notion', title: 'Notion', gridThumbnail: '/about/tools-3.png', iconThumbnail: '/about/tools-3.png', interaction: 'nonClickable' },
  { id: 'tool-chatgpt', title: 'ChatGPT', gridThumbnail: '/about/tools-4.png', iconThumbnail: '/about/tools-4.png', interaction: 'nonClickable' },
];

export default ABOUT_ITEMS;
