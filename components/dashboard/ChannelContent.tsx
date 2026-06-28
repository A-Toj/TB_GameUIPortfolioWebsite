"use client";

import { ReactNode } from "react";
import ContentTile from "./ContentTile";
import SkillTree from "./SkillTree";
import {
  profile,
  projects,
  experience,
  skills,
  certifications,
  education,
} from "@/lib/data";
import { ChannelId } from "@/lib/types";

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-neutral-300/70 bg-white/60 px-2.5 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-xbox-deep">
        {kicker}
      </p>
      <h2 className="font-display text-3xl font-bold text-neutral-900">{title}</h2>
    </div>
  );
}

/* Xbox 360-style horizontally-scrolling tile strip */
function Strip({ children }: { children: ReactNode }) {
  return (
    <div className="flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
      {children}
    </div>
  );
}

function StripItem({
  children,
  width = "w-[300px] sm:w-[330px]",
}: {
  children: ReactNode;
  width?: string;
}) {
  return <div className={`shrink-0 snap-start ${width}`}>{children}</div>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((h, i) => (
        <li key={i} className="flex gap-2 text-xs text-neutral-600">
          <span className="mt-1 text-xbox-deep">▸</span>
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ChannelContent({
  id,
  go,
}: {
  id: ChannelId;
  go: (id: ChannelId) => void;
}) {
  switch (id) {
    case "home":
      return (
        <div className="grid items-stretch gap-5 lg:grid-cols-4">
          {/* Left section */}
          <div className="order-2 flex flex-col gap-5 lg:order-1 lg:col-span-1">
            <ContentTile
              eyebrow="Featured Project"
              title={projects[0].title}
              onClick={() => go("projects")}
              className="flex-1"
              footer={
                <span className="text-xs font-semibold text-xbox-deep">
                  View all projects →
                </span>
              }
            >
              <p>{projects[0].blurb}</p>
              <Bullets items={projects[0].highlights.slice(0, 1)} />
            </ContentTile>
          </div>

          {/* Center main piece — gamertag profile */}
          <section className="relative order-1 overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-7 text-center shadow-tile lg:order-2 lg:col-span-2">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />
            <div className="relative mx-auto grid h-28 w-28 place-items-center rounded-2xl bg-gradient-to-br from-xbox-green to-xbox-deep font-display text-5xl font-bold text-white shadow-glow">
              TB
            </div>
            <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-xbox-deep">
              Signed in
            </p>
            <h1 className="relative font-display text-4xl font-bold text-neutral-900 md:text-5xl">
              {profile.gamertag}
            </h1>
            <p className="relative mt-1 text-neutral-700">{profile.tagline}</p>
            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
              {profile.bio}
            </p>
            <div className="relative mt-4 flex flex-wrap justify-center gap-2">
              {skills.languages.slice(0, 6).map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <div className="relative mt-5 flex flex-wrap justify-center gap-3">
              <a
                href={profile.resume}
                className="rounded-xl bg-xbox-green px-4 py-2 font-display text-sm font-semibold text-ink-950 shadow-glow transition hover:brightness-105"
              >
                ▶ Download Resume
              </a>
              <button
                type="button"
                onClick={() => go("contact")}
                className="rounded-xl border border-neutral-400/60 bg-white/60 px-4 py-2 font-display text-sm font-semibold text-neutral-800 transition hover:border-xbox-deep/50"
              >
                Contact
              </button>
            </div>
          </section>

          {/* Right section */}
          <div className="order-3 flex flex-col gap-5 lg:order-3 lg:col-span-1">
            <ContentTile
              eyebrow="Now Building"
              title={experience[0].org}
              onClick={() => go("experience")}
              className="flex-1"
              footer={
                <span className="text-xs font-semibold text-xbox-deep">
                  See experience →
                </span>
              }
            >
              {experience[0].title}
            </ContentTile>

            <ContentTile
              eyebrow="Loadout"
              title="Tech Stack"
              onClick={() => go("skills")}
              className="flex-1"
              footer={
                <span className="text-xs font-semibold text-xbox-deep">
                  Full skills →
                </span>
              }
            >
              <div className="mt-1 flex flex-wrap gap-2">
                {skills.frameworks.concat(skills.tools.slice(0, 3)).map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </ContentTile>
          </div>
        </div>
      );

    case "projects":
      return (
        <div>
          <SectionTitle kicker="Browse my recent" title="Projects" />
          <Strip>
            {projects.map((p) => (
              <StripItem key={p.title} width="w-[300px] sm:w-[340px]">
                <ContentTile
                  eyebrow={p.stack.join(" • ")}
                  title={p.title}
                  footer={
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-xbox-deep hover:underline"
                    >
                      View on GitHub →
                    </a>
                  }
                >
                  <p>{p.blurb}</p>
                  <Bullets items={p.highlights.slice(0, 2)} />
                </ContentTile>
              </StripItem>
            ))}
          </Strip>
        </div>
      );

    case "experience":
      return (
        <div>
          <SectionTitle kicker="Where I've worked" title="Experience" />
          <Strip>
            {experience.map((role) => (
              <StripItem key={role.org} width="w-[340px] sm:w-[380px]">
                <ContentTile eyebrow={role.period} title={role.title}>
                  <p className="text-neutral-700">
                    {role.org}{" "}
                    <span className="text-neutral-400">• {role.location}</span>
                  </p>
                  <Bullets items={role.points} />
                </ContentTile>
              </StripItem>
            ))}
          </Strip>
        </div>
      );

    case "skills":
      return (
        <div>
          <SectionTitle kicker="My loadout" title="Skill Tree" />
          <SkillTree />
        </div>
      );

    case "about":
      return (
        <div>
          <SectionTitle kicker="Get to know me" title="About" />
          <Strip>
            <StripItem width="w-[340px] sm:w-[420px]">
              <ContentTile eyebrow="Bio" title={profile.gamertag}>
                <p>{profile.bio}</p>
              </ContentTile>
            </StripItem>

            <StripItem width="w-[300px] sm:w-[340px]">
              <ContentTile eyebrow="Education" title={education.degree}>
                <p className="text-neutral-700">{education.school}</p>
                <p className="text-xs text-neutral-500">
                  {education.location} • {education.graduation}
                </p>
                <p className="mt-2 text-xs text-neutral-600">
                  Coursework: {education.coursework.join(", ")}
                </p>
              </ContentTile>
            </StripItem>

            <StripItem width="w-[320px] sm:w-[360px]">
              <ContentTile eyebrow="Certifications" title="Credentials">
                <ul className="mt-1 space-y-2">
                  {certifications.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-center justify-between gap-3 rounded-lg border border-neutral-300/70 bg-white/60 px-3 py-2"
                    >
                      <span className="text-sm text-neutral-700">{c.name}</span>
                      <span
                        className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                          c.status === "Certified"
                            ? "bg-xbox-green/30 text-xbox-deep"
                            : "bg-neutral-200 text-neutral-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </ContentTile>
            </StripItem>
          </Strip>
        </div>
      );

    case "contact":
      return (
        <div>
          <SectionTitle kicker="Get in touch" title="Contact" />
          <Strip>
            <StripItem width="w-[220px]">
              <ContactTile label="Email" value={profile.email} href={`mailto:${profile.email}`} icon="✉" />
            </StripItem>
            <StripItem width="w-[220px]">
              <ContactTile label="GitHub" value="github.com" href={profile.github} icon="▦" />
            </StripItem>
            <StripItem width="w-[220px]">
              <ContactTile label="LinkedIn" value="linkedin.com" href={profile.linkedin} icon="in" />
            </StripItem>
            <StripItem width="w-[220px]">
              <ContactTile label="Resume" value="Download PDF" href={profile.resume} icon="▶" />
            </StripItem>
          </Strip>
        </div>
      );

    default:
      return null;
  }
}

function ContactTile({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  icon: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-tile transition hover:-translate-y-1 hover:border-xbox-deep/40 hover:bg-white/90"
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-xbox-green/25 font-display text-lg text-xbox-deep">
        {icon}
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
          {label}
        </p>
        <p className="font-display text-lg text-neutral-800">{value}</p>
      </div>
    </a>
  );
}
