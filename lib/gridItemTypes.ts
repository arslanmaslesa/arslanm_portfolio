export type GridItemState = 'clickable' | 'nonClickable' | 'locked';

export type GridItem = {
  id: string;
  title?: string;
  gridThumbnail: string;
  iconThumbnail: string;
  interaction?: GridItemState;
};