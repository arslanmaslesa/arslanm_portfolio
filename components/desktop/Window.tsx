"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useDragControls, useReducedMotion } from 'framer-motion';
import type { WindowData } from '../../lib/desktopTypes';
import { useDesktopContext } from './WindowManager';
import { windowVariants } from '../../lib/animations';

type Props = { win: WindowData; children?: React.ReactNode };

export const Window: React.FC<Props> = ({ win, children }) => {
  const { focusWindow, closeWindow, moveWindow, focusedWindowId } = useDesktopContext();
  const dragControls = useDragControls();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (focusedWindowId === win.id && ref.current) {
      ref.current.focus();
    }
  }, [focusedWindowId, win.id]);

  const handleDragEnd = (_: any, info: any) => {
    const newPos = { x: win.position.x + info.offset.x, y: win.position.y + info.offset.y };
    moveWindow(win.id, newPos);
    // Re-enable text selection after drag
    try {
      document.body.style.userSelect = '';
      (document.body as any).style.webkitUserSelect = '';
    } catch (e) {
      /* ignore */
    }
  };

  const onTitlePointerDown = (e: React.PointerEvent) => {
    // start dragging from titlebar
    dragControls.start(e as any);
  };

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    focusWindow(win.id);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeWindow(win.id);
  };

  return (
    <motion.div
      role="dialog"
      aria-label={win.title}
      tabIndex={-1}
      ref={ref}
      onKeyDown={onKeyDown}
      onMouseDown={onClick}
      initial="hidden"
      animate={"visible"}
      exit="exit"
      custom={reduced}
      variants={windowVariants}
      style={{ x: win.position.x, y: win.position.y, zIndex: win.zIndex, position: 'absolute' } as any}
      drag
      onDragStart={() => {
        try {
          document.body.style.userSelect = 'none';
          (document.body as any).style.webkitUserSelect = 'none';
        } catch (e) {
          /* ignore */
        }
      }}
      dragMomentum={false}
      dragListener={false}
      onDragEnd={handleDragEnd}
      dragControls={dragControls}
      className="w-[520px] bg-white rounded-md shadow-lg ring-1 ring-slate-100 overflow-hidden"
    >
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100 cursor-default" onPointerDown={onTitlePointerDown}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-400" />
          <div className="text-sm font-medium text-slate-700">{win.title}</div>
        </div>
        <div>
          <button
            aria-label={`Close ${win.title}`}
            onClick={() => closeWindow(win.id)}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="p-4 text-slate-700 min-h-[160px]">{children}</div>
    </motion.div>
  );
};

export default Window;
