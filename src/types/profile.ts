// ── Types ──────────────────────────────────────────────────
export interface Skill {
  title: string
  icon: string
  dotColor: string
  items: string[]
}

export interface Project {
  title: string
  desc: string
  tags: string[]
  img: string
  disabled?: boolean
  link?: string
}

export interface Experience {
  period: string
  role: string
  company: string
  desc: string
  current: boolean
}

export interface ContactInfo {
  label: string
  icon: string
  value: string
}