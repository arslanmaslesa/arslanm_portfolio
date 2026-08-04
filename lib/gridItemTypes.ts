export type GridItemState = 'clickable' | 'nonClickable' | 'locked';

export type GridItem = {
  id: string;
  title?: string;
  thumbnail: string;
  interaction?: GridItemState;
};