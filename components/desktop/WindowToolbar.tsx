"use client";

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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
}: WindowToolbarProps) {
  return (
    <header className="cursor-default" onPointerDown={onPointerDown}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1">
          <div
            className={navigationSurfaceClass}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <ToolbarButton variant="navigation" aria-label="Back">
              <ChevronIcon direction="left" />
            </ToolbarButton>

            <div className="mx-0.5 h-5 w-px bg-slate-200" />

            <ToolbarButton variant="navigation" aria-label="Forward">
              <ChevronIcon direction="right" />
            </ToolbarButton>
          </div>

          <span className="ml-3 text-sm font-medium text-black">
            {title}
          </span>
        </div>

        <div
          className="flex items-center gap-3"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className={actionSurfaceClass}>
            <ToolbarButton variant="pill" aria-label="Change view">
              <GridIcon />
              <SortIcon />
            </ToolbarButton>
          </div>

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