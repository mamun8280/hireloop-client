import Image from "next/image"

import {
  BriefcaseBusiness,
  MapPin,
  Search,
  Star,
  Trophy,
  UserSearch,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import heroGlobe from "../app/images/hero-globe.png"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  {
    icon: BriefcaseBusiness,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Trophy,
    value: "12K",
    label: "Companies",
  },
  {
    icon: UserSearch,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#010103]">
      {/* Backdrop: planet horizon + starfield + atmosphere glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
      >
        <Image
          src={heroGlobe}
          alt=""
          priority
          className="min-w-[900px] max-w-[1440px] w-[100vw] -translate-x-1/2 absolute left-1/2 bottom-0 select-none"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-[18%] left-1/2 z-0 size-[560px] -translate-x-1/2 rounded-full bg-[#614FFB]/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[8%] left-1/2 z-0 size-[420px] -translate-x-[65%] rounded-full bg-[#5C53FE]/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[28%] left-1/2 z-0 size-[380px] translate-x-[45%] rounded-full bg-[#DC02CE]/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto flex max-w-[784px] flex-col items-center px-4 pt-16 pb-24 sm:px-6">
        {/* Announcement badge */}
        <div className="flex w-full max-w-full items-center gap-6">
          <span
            aria-hidden
            className="hidden h-px w-16 shrink-0 bg-gradient-to-r from-transparent to-white/60 sm:block"
          />
          <div className="flex min-w-0 items-center gap-2.5 rounded-full bg-gradient-to-b from-[#474747] to-[#010102] px-5 py-3 ring-1 ring-white/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]">
            <svg
              aria-hidden
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="size-6 shrink-0"
            >
              <defs>
                <linearGradient id="hero-badge-icon" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E6EEFF" />
                  <stop offset="1" stopColor="#BAC8FA" />
                </linearGradient>
              </defs>
              <g
                stroke="url(#hero-badge-icon)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M3 12h18" />
                <path d="M12 12v2" />
              </g>
            </svg>
            <span className="truncate font-mono-brand text-sm text-white sm:text-[20px]">
              50,000+ new jobs this month
            </span>
          </div>
          <span
            aria-hidden
            className="hidden h-px w-16 shrink-0 bg-gradient-to-l from-transparent to-white/60 sm:block"
          />
        </div>

        {/* Headline + subcopy */}
        <h1 className="mt-8 text-center font-display text-4xl leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-5xl md:text-[56px]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-5 max-w-[640px] text-center font-display text-base leading-[1.6] text-white/70 sm:text-lg md:text-[20px]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="/jobs"
          method="GET"
          className="mt-10 flex w-full flex-col gap-3 rounded-2xl border border-white/20 bg-[#101010] p-4 md:flex-row md:items-center md:gap-0 md:rounded-2xl md:px-5"
        >
          <label className="flex min-w-0 flex-1 items-center gap-2.5 md:pr-4">
            <Search className="size-6 shrink-0 text-white/80" />
            <Input
              type="search"
              name="q"
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="h-9 rounded-none border-0 bg-transparent px-0 text-white/80 placeholder:text-white/80 focus-visible:ring-0 focus-visible:border-0 md:h-12 md:text-base dark:bg-transparent dark:disabled:bg-transparent"
            />
          </label>
          <span
            aria-hidden
            className="hidden h-px w-[23px] shrink-0 bg-white/20 md:block"
          />
          <label className="flex min-w-0 flex-1 items-center gap-2.5 md:px-4">
            <MapPin className="size-6 shrink-0 text-white/80" />
            <Input
              type="search"
              name="location"
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="h-9 rounded-none border-0 bg-transparent px-0 text-white/80 placeholder:text-white/80 focus-visible:ring-0 focus-visible:border-0 md:h-12 md:text-base dark:bg-transparent dark:disabled:bg-transparent"
            />
          </label>
          <Button
            type="submit"
            variant="default"
            size="icon"
            aria-label="Search jobs"
            className="h-12 w-full shrink-0 rounded-xl bg-[#5C53FE] text-white hover:bg-[#5C53FE]/80 md:size-12 md:w-12"
          >
            <Search className="size-5" />
          </Button>
        </form>

        {/* Trending positions */}
        <div className="mt-6 flex w-full flex-wrap items-center gap-2.5 max-md:justify-center">
          <span className="font-display text-base text-white/70">
            Trending Position
          </span>
          {trendingPositions.map((position) => (
            <a
              key={position}
              href={`/jobs?q=${encodeURIComponent(position)}`}
              className="rounded-full border border-white/10 bg-[#1A1A1B] px-3 py-1.5 font-display text-sm text-white transition-colors hover:bg-[#242426]"
            >
              {position}
            </a>
          ))}
        </div>
      </div>

      {/* Stats band */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6 md:pt-32">
        <h2 className="mx-auto max-w-[600px] text-center font-instrument text-2xl leading-[1.3] font-medium tracking-[-0.025em] text-white/70 sm:text-3xl md:text-[40px]">
          Assisting over 15,000 job seekers find their dream positions.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <HeroStatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function HeroStatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof BriefcaseBusiness
  value: string
  label: string
}) {
  return (
    <Card
      className={cn(
        "gap-0 rounded-2xl ring-foreground/10 ring-white/10 bg-gradient-to-b from-[#010102] to-[#313131] px-6 py-6 [--card-spacing:0] md:h-[254px]"
      )}
    >
      <Icon className="size-6 text-white" />
      <div className="mt-auto">
        <div className="font-jakarta text-4xl font-semibold text-white sm:text-5xl md:text-[56px]">
          {value}
        </div>
        <div className="mt-2 font-inter-tight text-base leading-[1.65] font-normal text-white sm:text-lg md:text-[18px]">
          {label}
        </div>
      </div>
    </Card>
  )
}
