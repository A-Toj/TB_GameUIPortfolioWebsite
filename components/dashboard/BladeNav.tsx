"use client";

import { motion } from "framer-motion";
import { Channel } from "@/lib/types";

interface Props {
  channels: Channel[];
  active: number;
  onSelect: (index: number) => void;
}

export default function BladeNav({ channels, active, onSelect }: Props) {
  return (
    <nav aria-label="Dashboard channels">
      <ul className="flex items-end gap-5 overflow-x-auto pb-2 sm:gap-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {channels.map((channel, i) => {
          const isActive = i === active;
          return (
            <li key={channel.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? "page" : undefined}
                className="group relative flex items-center gap-2 pb-2 outline-none transition-colors"
              >
                <span
                  className={`text-lg transition-colors ${
                    isActive ? "text-xbox-deep" : "text-neutral-500 group-hover:text-neutral-700"
                  }`}
                  aria-hidden
                >
                  {channel.icon}
                </span>
                <span
                  className={`font-display uppercase tracking-wide transition-all ${
                    isActive
                      ? "text-lg font-semibold text-neutral-900 sm:text-xl"
                      : "text-sm font-medium text-neutral-500 group-hover:text-neutral-700"
                  }`}
                >
                  {channel.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="blade-underline"
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-xbox-green to-xbox-deep shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-1 h-px w-full bg-gradient-to-r from-neutral-900/25 via-neutral-900/10 to-transparent" />
    </nav>
  );
}
