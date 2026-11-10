"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Building2,
  ChevronRight,
  DollarSign,
  MapPin,
  Send,
  BriefcaseBusiness,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

// Job Types
const JOB_TYPES = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
] as const

// Job Categories
const JOB_CATEGORIES = [
  { label: "Engineering & Tech", value: "engineering-tech" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Product", value: "product" },
  { label: "Infrastructure", value: "infrastructure" },
  {label: "Quality", value: "quality" },
] as const

// Salary Frequencies
const SALARY_FREQUENCIES = [
  { label: "per hour", value: "per hour" },
  { label: "per day", value: "per day" },
  { label: "per month", value: "per month" },
  { label: "per year", value: "per year" },
] as const

// Validation Schema
const jobFormSchema = z
  .object({
    title: z.string().min(3, "Job title is required"),
    companyName: z.string().min(2, "Company name is required"),
    category: z.string().min(1, "Select a job category"),
    jobType: z.string().min(1, "Select a job type"),
    isRemote: z.boolean(),
    location: z.string().optional(),
    deadline: z.string().optional(),
    minSalary: z.string().min(1, "Enter a minimum value"),
    maxSalary: z.string().min(1, "Enter a maximum value"),
    frequency: z.string().min(1, "Select a frequency"),
    responsibilities: z.string().min(10, "Describe the responsibilities"),
    requirements: z.string().min(10, "Describe the requirements"),
  })
  .superRefine((data, ctx) => {
    if (!data.isRemote && (!data.location || data.location.trim().length < 2)) {
      ctx.addIssue({
        code: "custom",
        path: ["location"],
        message: "Job location is required",
      })
    }

    if (data.minSalary && data.maxSalary) {
      const min = Number(data.minSalary)
      const max = Number(data.maxSalary)

      if (Number.isNaN(min) || min < 0) {
        ctx.addIssue({
          code: "custom",
          path: ["minSalary"],
          message: "Enter a valid amount",
        })
      }

      if (Number.isNaN(max) || max < 0) {
        ctx.addIssue({
          code: "custom",
          path: ["maxSalary"],
          message: "Enter a valid amount",
        })
      }

      if (!Number.isNaN(min) && !Number.isNaN(max) && max < min) {
        ctx.addIssue({
          code: "custom",
          path: ["maxSalary"],
          message: "Max must be higher than min",
        })
      }
    }
  })

type JobFormValues = z.infer<typeof jobFormSchema>

// Default Values
const DEFAULT_VALUES: JobFormValues = {
  title: "",
  companyName: "",
  category: "",
  jobType: "",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "",
  responsibilities: "",
  requirements: "",
}

// Reusable Styles
const inputClass =
  "h-10 w-full rounded-lg border-white/5 bg-[#222225] text-white placeholder:text-zinc-500 focus-visible:ring-[#7161F5]"

const labelClass = "text-xs font-medium text-zinc-300"

function FieldError({ error }: { error?: { message?: React.ReactNode } }) {
  if (!error?.message) return null

  return <p className="text-xs text-red-400">{error.message}</p>
}

// Section Header
function SectionHeader({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <CardHeader className="space-y-1 px-4 pt-4 pb-3 sm:px-5">
      <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
        <span className="flex size-5 items-center justify-center rounded-full bg-[#7161F5]/15 text-[10px] text-[#9287FF]">
          {number}
        </span>
        {title}
      </CardTitle>

      <CardDescription className="text-xs text-zinc-500">
        {description}
      </CardDescription>
    </CardHeader>
  )
}

export function PostNewJobPage() {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = form

  const isRemote = watch("isRemote")
  const selectedCategory = watch("category")
  const selectedJobType = watch("jobType")
  const selectedFrequency = watch("frequency")

  const onSubmit = async (values: JobFormValues) => {
    const data = {
      ...values,
      minSalary: Number(values.minSalary),
      maxSalary: Number(values.maxSalary),
    }

    // TODO: Connect your real API here
    await new Promise((resolve) => setTimeout(resolve, 600))

    console.log("Job form data:", data)

    toast.success("Job posted successfully!")
    reset(DEFAULT_VALUES)
  }

  return (
    <main className="min-h-screen w-full bg-[#121214] px-3 py-5 text-white sm:px-5 sm:py-7 md:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-5">
        {/* Page Header */}
        <header className="flex flex-col gap-4 border-b border-white/5 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <nav className="flex items-center gap-1 text-[11px] text-zinc-500">
              <Link
                href="/dashboard/recruiter/jobs"
                className="transition-colors hover:text-white"
              >
                Manage Jobs
              </Link>

              <ChevronRight className="size-3" />

              <span className="text-zinc-300">Create New Listing</span>
            </nav>

            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Post a New Job
            </h1>

            <p className="max-w-xl text-xs leading-relaxed text-zinc-500 sm:text-sm">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          <Button
            type="submit"
            form="post-job-form"
            disabled={isSubmitting}
            className="h-10 w-full shrink-0 rounded-lg bg-[#7161F5] px-5 text-xs font-semibold text-white shadow-lg shadow-[#7161F5]/10 transition-colors hover:bg-[#6253E8] sm:w-auto"
          >
            <Send className="mr-2 size-3.5" />

            {isSubmitting ? "Publishing..." : "Publish Job"}
          </Button>
        </header>

        {/* Job Form */}
        <form
          id="post-job-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* 1. Basic Information */}
          <Card className="overflow-hidden rounded-xl border-white/5 bg-[#19191C] shadow-none">
            <SectionHeader
              number="1"
              title="Basic Information"
              description="Give the role a name and categorize it."
            />

            <CardContent className="space-y-4 px-4 pb-5 sm:px-5">
              {/* Job Title */}
              <div className="space-y-2">
                <Label className={labelClass}>Job Title *</Label>

                <Input
                  {...register("title")}
                  placeholder="Frontend Developer"
                  className={inputClass}
                  aria-invalid={!!errors.title}
                />

                <FieldError error={errors.title} />
              </div>

              {/* Company & Category */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className={labelClass}>Company Name *</Label>

                  <div className="relative">
                    <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />

                    <Input
                      {...register("companyName")}
                      placeholder="HirePulse Network"
                      className={`${inputClass} pl-9`}
                      aria-invalid={!!errors.companyName}
                    />
                  </div>

                  <FieldError error={errors.companyName} />
                </div>

                <div className="space-y-2">
                  <Label className={labelClass}>Job Category *</Label>

                  <Select
                    items={JOB_CATEGORIES}
                    value={selectedCategory || null}
                    onValueChange={(value) =>
                      setValue("category", (value as string) ?? "", {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger
                      className={`${inputClass} h-10`}
                      aria-invalid={!!errors.category}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent className="border-white/10 bg-[#222225] text-white">
                      {JOB_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FieldError error={errors.category} />
                </div>
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label className={labelClass}>Job Type *</Label>

                <div
                  className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4"
                  role="group"
                  aria-label="Job Type"
                >
                  {JOB_TYPES.map((type) => {
                    const isSelected = selectedJobType === type.value

                    return (
                      <button
                        key={type.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          setValue("jobType", type.value, {
                            shouldValidate: true,
                          })
                        }
                        className={`h-10 w-full rounded-lg text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[#7161F5]/50 focus-visible:outline-none ${
                          isSelected
                            ? "border border-[#7161F5] bg-[#7161F5]/15 text-white"
                            : "border border-white/5 bg-[#222225] text-zinc-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {type.label}
                      </button>
                    )
                  })}
                </div>

                <FieldError error={errors.jobType} />
              </div>
            </CardContent>
          </Card>

          {/* 2. Location, Compensation & Timeline */}
          <Card className="overflow-hidden rounded-xl border-white/5 bg-[#19191C] shadow-none">
            <SectionHeader
              number="2"
              title="Location, Compensation & Timeline"
              description="Where is the role and what does it pay?"
            />

            <CardContent className="space-y-4 px-4 pb-5 sm:px-5">
              {/* Remote Toggle */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-[#222225] p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#7161F5]/10">
                    <BriefcaseBusiness className="size-4 text-[#9287FF]" />
                  </div>

                  <div className="space-y-0.5">
                    <Label className="text-xs font-medium text-white">
                      Remote Work Allowed
                    </Label>

                    <p className="text-[11px] text-zinc-500">
                      Enable worldwide or distributed candidate applications
                    </p>
                  </div>
                </div>

                <Switch
                  checked={isRemote}
                  onCheckedChange={(checked) =>
                    setValue("isRemote", checked === true, {
                      shouldValidate: true,
                    })
                  }
                />
              </div>

              {/* Location & Deadline */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className={labelClass}>
                    Job Location {!isRemote && "*"}
                  </Label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />

                    <Input
                      {...register("location")}
                      placeholder={isRemote ? "Remote" : "New York, USA"}
                      className={`${inputClass} pl-9`}
                    />
                  </div>

                  <FieldError error={errors.location} />
                </div>

                <div className="space-y-2">
                  <Label className={labelClass}>Application Deadline</Label>

                  <Input
                    {...register("deadline")}
                    type="date"
                    className={inputClass}
                  />

                  <FieldError error={errors.deadline} />
                </div>
              </div>

              {/* Salary */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label className={labelClass}>Min Salary / Rate *</Label>

                  <div className="relative">
                    <DollarSign className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />

                    <Input
                      {...register("minSalary")}
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="25"
                      className={`${inputClass} pl-9`}
                      aria-invalid={!!errors.minSalary}
                    />
                  </div>

                  <FieldError error={errors.minSalary} />
                </div>

                <div className="space-y-2">
                  <Label className={labelClass}>Max Salary / Rate *</Label>

                  <div className="relative">
                    <DollarSign className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />

                    <Input
                      {...register("maxSalary")}
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="40"
                      className={`${inputClass} pl-9`}
                      aria-invalid={!!errors.maxSalary}
                    />
                  </div>

                  <FieldError error={errors.maxSalary} />
                </div>

                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <Label className={labelClass}>Frequency *</Label>

                  <Select
                    items={SALARY_FREQUENCIES}
                    value={selectedFrequency || null}
                    onValueChange={(value) =>
                      setValue("frequency", (value as string) ?? "", {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger
                      className={inputClass}
                      aria-invalid={!!errors.frequency}
                    >
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>

                    <SelectContent className="border-white/10 bg-[#222225] text-white">
                      {SALARY_FREQUENCIES.map((frequency) => (
                        <SelectItem
                          key={frequency.value}
                          value={frequency.value}
                        >
                          {frequency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FieldError error={errors.frequency} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Responsibilities & Requirements */}
          <Card className="overflow-hidden rounded-xl border-white/5 bg-[#19191C] shadow-none">
            <SectionHeader
              number="3"
              title="Responsibilities & Requirements"
              description="Tell candidates what the work is and what you expect."
            />

            <CardContent className="space-y-4 px-4 pb-5 sm:px-5">
              {/* Responsibilities */}
              <div className="space-y-2">
                <Label className={labelClass}>Key Responsibilities *</Label>

                <Textarea
                  {...register("responsibilities")}
                  rows={4}
                  placeholder="Showcase your commitment to delivering exceptional user experiences..."
                  className="min-h-28 resize-y rounded-lg border-white/5 bg-[#222225] text-sm text-white placeholder:text-zinc-500 focus-visible:ring-[#7161F5]"
                  aria-invalid={!!errors.responsibilities}
                />

                <FieldError error={errors.responsibilities} />
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label className={labelClass}>
                  Qualifications & Requirements *
                </Label>

                <Textarea
                  {...register("requirements")}
                  rows={4}
                  placeholder={
                    "• 3+ years of experience with React, TypeScript...\n• Solid understanding of DOM performance...\n• Experience working with product teams..."
                  }
                  className="min-h-28 resize-y rounded-lg border-white/5 bg-[#222225] text-sm text-white placeholder:text-zinc-500 focus-visible:ring-[#7161F5]"
                  aria-invalid={!!errors.requirements}
                />

                <FieldError error={errors.requirements} />
              </div>
            </CardContent>
          </Card>

          {/* Bottom Actions */}
          <div className="flex justify-end gap-3 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset(DEFAULT_VALUES)}
              className="h-10 rounded-lg border-white/10 bg-transparent px-5 text-xs text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              Discard
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 rounded-lg bg-[#7161F5] px-5 text-xs font-semibold text-white hover:bg-[#6253E8]"
            >
              <Send className="mr-2 size-3.5" />

              {isSubmitting ? "Publishing..." : "Publish Job"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default PostNewJobPage
