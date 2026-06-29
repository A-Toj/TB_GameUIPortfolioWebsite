"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { channels, media, profile } from "@/lib/data";
import { ChannelId } from "@/lib/types";
import BladeNav from "./BladeNav";
import GamertagBar from "./GamertagBar";
import ChannelContent from "./ChannelContent";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

export default function DashboardShell() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);

  const select = (i: number) => {
    setDir(i >= index ? 1 : -1);
    setIndex(i);
  };

  const go = (id: ChannelId) => {
    const i = channels.findIndex((c) => c.id === id);
    if (i >= 0) select(i);
  };

  // Xbox-style left/right navigation between channels.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setDir(1);
        setIndex((p) => (p + 1) % channels.length);
      } else if (e.key === "ArrowLeft") {
        setDir(-1);
        setIndex((p) => (p - 1 + channels.length) % channels.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between gap-4">
        <div className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-neutral-600">
          Tanroj<span className="text-xbox-deep"> // </span>Dashboard
        </div>
        <GamertagBar />
      </header>

      <div className="mt-6">
        <BladeNav channels={channels} active={index} onSelect={select} />
      </div>

      <main className="relative mt-7 flex-1">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={channels[index].id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <ChannelContent id={channels[index].id} go={go} />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-10 flex items-center justify-between border-t border-white/20 pt-4 text-xs text-neutral-200">
        <div className="flex items-center gap-2">
          <img
            src={media.profile}
            alt={profile.gamertag}
            className="h-7 w-7 rounded-full border border-white/30 object-cover"
          />
          <span className="hidden sm:inline">Use ← → to switch channels</span>
        </div>
        <span>© {new Date().getFullYear()} Tanroj Billing</span>
      </footer>
    </div>
  );
}
