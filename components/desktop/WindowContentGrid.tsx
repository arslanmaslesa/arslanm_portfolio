"use client";

import React from "react";
import WindowGrid from "./WindowGrid";

const Tile: React.FC = () => (
  <div style={{ background: "#F2F2F3", minHeight: 312, borderRadius: 16 }} />
);

const WindowContentGrid: React.FC = () => {
  return (
    <WindowGrid gap={12} className="w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <Tile key={i} />
      ))}
    </WindowGrid>
  );
};

export default WindowContentGrid;
