"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { IconData } from '../../lib/desktopTypes';
import { useDesktopContext } from './WindowManager';
import Folder from './Folder';

type Props = { data: IconData; zIndex?: number };

export const DesktopIcon: React.FC<Props> = ({ data, zIndex = 40 }) => {
  const reduced = useReducedMotion();
  const { iconPositions, moveIcon, openWindow, selectIcon, selectedIconId } = useDesktopContext();
  const pos = iconPositions[data.id] ?? data.defaultPosition;

  const draggingRef = React.useRef(false);

  const handleDragStart = () => {
    draggingRef.current = true;
    try {
      document.body.style.userSelect = 'none';
      (document.body as any).style.webkitUserSelect = 'none';
    } catch (e) {
      /* ignore */
    }
  };

  const handleDragEnd = (_: any, info: any) => {
    const newPos = { x: pos.x + info.offset.x, y: pos.y + info.offset.y };
    moveIcon(data.id, newPos);
    // Re-enable text selection after drag
    try {
      document.body.style.userSelect = '';
      (document.body as any).style.webkitUserSelect = '';
    } catch (e) {
      /* ignore */
    }
    // keep a short flag so click handlers can detect recent drag
    window.setTimeout(() => {
      draggingRef.current = false;
    }, 50);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // ignore clicks that were the end of a drag
    if (draggingRef.current) return;
    selectIcon(data.id);
    // open on single click
    openWindow(data.id, data.label, data.contentType);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // kept for compatibility; single-click opens already
    openWindow(data.id, data.label, data.contentType);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') openWindow(data.id, data.label, data.contentType);
  };

  return (
    <motion.div
      role="button"
      aria-label={data.label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      initial={false}
      animate={{ x: pos.x, y: pos.y }}
      drag
      onDragStart={handleDragStart}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: reduced ? 1 : 0.98 }}
      className="absolute w-19 cursor-grab text-center focus:outline-none desktop-icon max-md:w-20"
      style={{ zIndex }}
    >
      <div className="flex flex-col items-center select-none">
        <div className="relative h-16 w-16">
          {/* Folder color: work -> blue, playground -> red, about -> black */}
          <Folder
            className="h-full w-full"
            color={
              data.contentType === 'work'
                ? 'blue'
                : data.contentType === 'playground'
                ? 'red'
                : data.contentType === 'about'
                ? 'black'
                : 'blue'
            }
          />
        </div>
        <div className="mt-2 text-base tracking-[-0.02em] font-normal text-slate-700" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
          {data.label}
        </div>
      </div>
    </motion.div>
  );
};

export default DesktopIcon;
