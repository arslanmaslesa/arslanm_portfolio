"use client";

import React from 'react';
import type {
  ButtonHTMLAttributes,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "navigation" | "action" | "pill";
};

type WindowToolbarProps = {
  title: string;
  onClose: () => void;
  onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
  viewMode?: 'grid' | 'icons';
  onViewChange?: (mode: 'grid' | 'icons') => void;
  onBack?: () => void;
  onForward?: () => void;
  showViewOptions?: boolean;
};

const navigationSurfaceClass =
  "inline-flex items-center justify-center rounded-full bg-white p-1 shadow-[0_8px_20px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.04)]";

const actionSurfaceClass =
  "inline-flex items-center justify-center rounded-full bg-white p-px shadow-[0_8px_20px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.04)]";

const navigationButtonClass =
  "inline-flex h-7 w-7 items-center justify-center rounded-full text-black transition-colors duration-150 hover:bg-[#f1f1f1] active:bg-[#e7e7e7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70";

const actionButtonClass =
  "inline-flex h-[34px] items-center justify-center rounded-full px-2 text-black transition-colors duration-150 hover:bg-[#f1f1f1] active:bg-[#e7e7e7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70";

const pillButtonClass =
  "inline-flex h-[34px] items-center justify-center gap-1 rounded-full px-2 text-black transition-colors duration-150 hover:bg-[#f1f1f1] active:bg-[#e7e7e7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70";

function ToolbarButton({
  children,
  variant = "action",
  ...props
}: ToolbarButtonProps) {
  const className =
    variant === "navigation"
      ? navigationButtonClass
      : variant === "pill"
        ? pillButtonClass
        : actionButtonClass;

  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const path =
    direction === "left" ? "M14.5 5L7.5 12L14.5 19" : "M9.5 5L16.5 12L9.5 19";

  return (
    <svg
      className="shrink-0"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      className="shrink-0"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg
      className="shrink-0"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 9L12 4L17 9M7 15L12 20L17 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="shrink-0"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WindowToolbar({
  title,
  onClose,
  onPointerDown,
  viewMode = 'grid',
  onViewChange,
  onBack,
  onForward,
  showViewOptions = true,
}: WindowToolbarProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((s) => !s);
  };

  const select = (mode: 'grid' | 'icons') => {
    setOpen(false);
    onViewChange?.(mode);
  };

  React.useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (!open) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [open]);
  return (
    <header className="cursor-default" onPointerDown={onPointerDown}>
      <div className="flex items-center justify-between gap-3 max-md:gap-1">
        <div className="flex min-w-0 items-center gap-1">
          <div
            className={navigationSurfaceClass}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <ToolbarButton variant="navigation" aria-label="Back" onClick={onBack} disabled={!onBack}>
              <ChevronIcon direction="left" />
            </ToolbarButton>

            <div className="mx-0.5 h-4 w-px bg-slate-200" />

            <ToolbarButton variant="navigation" aria-label="Forward" onClick={onForward} disabled={!onForward}>
              <ChevronIcon direction="right" />
            </ToolbarButton>
          </div>

          <span className="ml-3 truncate tracking-[-0.01em] font-medium text-black max-md:ml-2">
            {title}
          </span>
        </div>

        <div
          className="flex shrink-0 items-center gap-3 max-md:gap-1"
          onPointerDown={(event) => event.stopPropagation()}
        >
          {showViewOptions && <div className="relative" ref={containerRef}>
            <div className={actionSurfaceClass}>
              <ToolbarButton variant="pill" aria-label="Change view" onClick={toggle}>
                <GridIcon />
                <SortIcon />
              </ToolbarButton>
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl z-30 p-1 shadow-[0_8px_20px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.04)]">
                <button
                  onClick={() => select('grid')}
                  className="w-full flex items-center gap-1 px-1 py-2 rounded-xl hover:bg-[#f1f1f1]"
                >
                  <span className="w-5 flex justify-center text-slate-900">
                    {viewMode === 'grid' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span className="w-3" />
                    )}
                  </span>
                  <span className="text-sm text-slate-700">View as grid</span>
                </button>

                <button
                  onClick={() => select('icons')}
                  className="w-full flex items-center gap-1 px-1 py-2 rounded-xl hover:bg-[#f1f1f1]"
                >
                  <span className="w-5 flex justify-center text-slate-900">
                    {viewMode === 'icons' ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span className="w-3" />
                    )}
                  </span>
                  <span className="text-sm text-slate-700">View as icons</span>
                </button>
              </div>
            )}
          </div>}

          <div className={actionSurfaceClass}>
            <ToolbarButton
              variant="action"
              aria-label={`Close ${title}`}
              onClick={onClose}
            >
              <CloseIcon />
            </ToolbarButton>
          </div>
        </div>
      </div>
    </header>
  );
}
