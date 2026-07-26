"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from 'framer-motion';
import WindowGrid from "./WindowGrid";
import Folder from "./Folder";
import WORK_ITEMS, { WorkItem } from "../../content/work";
import { useDesktopContext } from './WindowManager';

type TileProps = {
  thumbnail: string;
  title?: string;
};

const Tile: React.FC<TileProps> = ({ thumbnail, title }) => (
  <div style={{ height: 320, width: '100%', borderRadius: 16, overflow: 'hidden' }}>
    <img
      src={thumbnail}
      alt={title ?? "work thumbnail"}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      draggable={false}
    />
  </div>
);

const WindowContentGrid: React.FC<{ mode?: 'grid' | 'icons'; items?: WorkItem[]; source?: 'work' | 'about' | 'playground' }> = ({ mode = 'grid', items, source = 'work' }) => {
  const { openWindow } = useDesktopContext();
  const list = items ?? WORK_ITEMS;
  // Hooks must be called unconditionally to satisfy Rules of Hooks
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = React.useRef(false);

  if (mode === 'icons') {
    return (
      <div ref={containerRef} className="w-full flex flex-wrap gap-6 h-full items-start content-start">
        {list.map((item) => (
          <motion.div
            key={item.id}
            className="w-28 text-center cursor-grab select-none"
            drag
            dragMomentum={false}
            dragConstraints={containerRef}
            onDragStart={() => {
              draggingRef.current = true;
              try {
                document.body.style.userSelect = 'none';
                (document.body as any).style.webkitUserSelect = 'none';
              } catch (e) {
                /* ignore */
              }
            }}
            onDragEnd={() => {
              try {
                document.body.style.userSelect = '';
                (document.body as any).style.webkitUserSelect = '';
              } catch (e) {
                /* ignore */
              }
              window.setTimeout(() => {
                draggingRef.current = false;
              }, 50);
            }}
            whileTap={{ scale: reduced ? 1 : 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              if (draggingRef.current) return;
              openWindow(item.id, item.title ?? item.id, source);
            }}
          >
            <div className="mx-auto h-16 w-16">
              <Folder className="w-full h-full" color="blue" />
            </div>
            <div className="mt-2 text-sm text-slate-700">{item.title}</div>
          </motion.div>
        ))}
      </div>
    );
  }

    return (
    <div className="w-full h-full">
      <WindowGrid gap={12} className="w-full h-full">
      {list.map((item) => (
        <Tile key={item.id} thumbnail={item.thumbnail} title={item.title} />
      ))}
      </WindowGrid>
    </div>
  );
};
export default WindowContentGrid;
