import type { GridItem } from '../lib/gridItemTypes';

export type WorkItem = GridItem;

export const ABOUT_ITEMS: WorkItem[] = [
  { id: 'about-1', title: 'Me', gridThumbnail: '/about/thumb-1.png', iconThumbnail: '/about/me.png', interaction: 'locked' },
  { id: 'about-2', title: 'Certifications', gridThumbnail: '/about/thumb-2.png', interaction: 'locked' },
  { id: 'about-3', title: 'Inspirations', gridThumbnail: '/about/thumb-3.png', interaction: 'locked' },
  { id: 'about-4', title: 'Tools', gridThumbnail: '/about/thumb-4.png'},
];

export const ABOUT_TOOLS_ITEMS: WorkItem[] = [
  { id: 'tool-figma', title: 'Figma', gridThumbnail: '/about/figma.png', iconThumbnail: '/about/tools/figma.png', interaction: 'nonClickable' },
  { id: 'tool-photoshop', title: 'Photoshop', gridThumbnail: '/about/photoshop.png', iconThumbnail: '/about/tools/photoshop.png', interaction: 'nonClickable' },
  { id: 'tool-illustrator', title: 'Illustrator', gridThumbnail: '/about/illustrator.png', iconThumbnail: '/about/tools/illustrator.png', interaction: 'nonClickable' },
  { id: 'tool-mac', title: 'My Macbook', gridThumbnail: '/about/tools-2.png', iconThumbnail: '/about/tools/mac.png', interaction: 'nonClickable' },
  { id: 'tool-claude', title: 'Claude', gridThumbnail: '/about/tools-3.png', iconThumbnail: '/about/tools/claude.png', interaction: 'nonClickable' },
  { id: 'tool-chatgpt', title: 'ChatGPT', gridThumbnail: '/about/chatgpt.png', iconThumbnail: '/about/tools/chatgpt.png', interaction: 'nonClickable' },
];

export default ABOUT_ITEMS;
