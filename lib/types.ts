export type ChannelId =
  | "home"
  | "projects"
  | "experience"
  | "skills"
  | "about"
  | "contact";

export interface Channel {
  id: ChannelId;
  label: string;
  icon: string;
}

export interface Project {
  title: string;
  stack: string[];
  blurb: string;
  highlights: string[];
  link?: string;
}

export interface Role {
  title: string;
  org: string;
  location: string;
  period: string;
  points: string[];
}

export interface SkillNode {
  name: string;
  level: 1 | 2 | 3;
  note?: string;
  icon: string;
}

export interface SkillBranch {
  id: string;
  name: string;
  monogram: string;
  tagline: string;
  skills: SkillNode[];
}
