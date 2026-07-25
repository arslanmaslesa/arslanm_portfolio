"use client";

import React from "react";
import WindowGrid from "./WindowGrid";
import WORK_ITEMS from "../../content/work";

type TileProps = {
  thumbnail: string;
  title?: string;
};

const Tile: React.FC<TileProps> = ({ thumbnail, title }) => (
  <div style={{ height: 312, width: '100%', borderRadius: 16, overflow: 'hidden' }}>
    <img
      src={thumbnail}
      alt={title ?? "work thumbnail"}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      draggable={false}
    />
  </div>
);

const WindowContentGrid: React.FC = () => {
  return (
    <WindowGrid gap={12} className="w-full">
      {WORK_ITEMS.map((item) => (
        <Tile key={item.id} thumbnail={item.thumbnail} title={item.title} />
      ))}
    </WindowGrid>
  );
};
export default WindowContentGrid;
