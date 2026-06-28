"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  accent?: boolean;
  className?: string;
}

export default function ContentTile({
  title,
  eyebrow,
  children,
  footer,
  onClick,
  accent = false,
  className = "",
}: Props) {
  const interactive = Boolean(onClick);

  return (
    <motion.div
      whileHover={interactive ? { y: -6 } : undefined}
      whileTap={interactive ? { scale: 0.99 } : undefined}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`group relative flex h-full flex-col gap-2 overflow-hidden rounded-2xl border p-5 shadow-tile ${
        accent
          ? "border-xbox-deep/30 bg-xbox-green/25"
          : "border-white/70 bg-white/80"
      } ${
        interactive ? "cursor-pointer hover:border-xbox-deep/40 hover:bg-white/90" : ""
      } ${className}`}
    >
      {/* Glossy top highlight (Xbox tile sheen) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />

      {/* Hover light sweep */}
      <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:animate-[sweep_0.8s_ease] group-hover:opacity-100" />

      {/* Whole-tile click target (only when interactive and no inner links) */}
      {interactive && (
        <button
          type="button"
          onClick={onClick}
          aria-label={title}
          className="absolute inset-0 z-10 outline-none"
        />
      )}

      <div className="relative z-0 flex h-full flex-col gap-2">
        {eyebrow && (
          <span className="text-[11px] font-semibold uppercase tracking-widest text-xbox-deep">
            {eyebrow}
          </span>
        )}
        {title && (
          <h3 className="font-display text-xl font-semibold leading-tight text-neutral-800">
            {title}
          </h3>
        )}
        {children && (
          <div className="text-sm leading-relaxed text-neutral-600">{children}</div>
        )}
        {footer && <div className="relative z-20 mt-auto pt-3">{footer}</div>}
      </div>
    </motion.div>
  );
}
