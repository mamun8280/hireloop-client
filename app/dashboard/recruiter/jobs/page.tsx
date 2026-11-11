
import Link from 'next/link';
import {
  Plus,
  Code2,
  Palette,
  Server,
  Megaphone,
  ShieldCheck,
  Globe,
  MapPin,
  Users,
  Pencil,
  Trash2,
  MoreVertical
} from 'lucide-react';

import { getjobs } from '@/lib/api/jobs';

export type JobFormSchema = {
  title: string;
  companyName: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location?: string;
  deadline?: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  requirements: string;
};

interface JobItem extends JobFormSchema {
  _id: string;
  status: 'Active' | 'Paused' | 'Closed' | 'Expired';
  postedDate: string;
  applicantsCount?: number;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'engineering':
      return <Code2 className="w-4 h-4 text-indigo-400" />;

    case 'design':
      return <Palette className="w-4 h-4 text-amber-500" />;

    case 'infrastructure':
      return <Server className="w-4 h-4 text-sky-400" />;

    case 'marketing':
      return <Megaphone className="w-4 h-4 text-purple-400" />;

    case 'quality':
    default:
      return <ShieldCheck className="w-4 h-4 text-blue-400" />;
  }
};

const ManageJobsPage = async () => {
  const jobs: JobItem[] = await getjobs();

  return (
    <div className="min-h-screen max-w-7xl bg-[#0d0f12] text-slate-200 p-4 sm:p-6 font-sans">
      <div className="max-w-full mx-auto space-y-5">

        {/* Header Section */}
        <div className="space-y-1">
          <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
            <span>Manage Jobs</span>
            <span>&gt;</span>
            <span className="text-slate-300">Job Listings & Postings</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Manage Job Posts
              </h1>

              <p className="text-xs text-slate-400 mt-0.5">
                Review live listings, monitor applicants, and update job details across your organization.
              </p>
            </div>

            <Link
              href="/dashboard/recruiter/jobs/new"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition-all focus:outline-none"
            >
              <Plus className="w-4 h-4" />
              New Job Post
            </Link>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-[#12151c] rounded-xl border border-slate-800/80 shadow-2xl overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">

              <thead>
                <tr className="border-b border-slate-800/80 bg-[#161922] text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th scope="col" className="py-3 px-3">Job Title & Dept</th>
                  <th scope="col" className="py-3 px-3">Company & Location</th>
                  <th scope="col" className="py-3 px-3">Type</th>
                  <th scope="col" className="py-3 px-3">Compensation</th>
                  <th scope="col" className="py-3 px-3">Applicants</th>
                  <th scope="col" className="py-3 px-3">Status</th>
                  <th scope="col" className="py-3 px-3">Deadline</th>
                  <th scope="col" className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-xs">

                {jobs.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-[#181c27]/60 transition-colors group"
                  >

                    {/* Job Title & Dept */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-md bg-[#1a1e2b] border border-slate-800/80 shrink-0">
                          {getCategoryIcon(job.category)}
                        </div>

                        <div className="min-w-0">
                          <div className="font-semibold text-white truncate max-w-35 group-hover:text-indigo-400 transition-colors">
                            {job.title}
                          </div>

                          <div className="text-[11px] text-indigo-400 font-medium truncate">
                            {job.category}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Company & Location */}
                    <td className="py-3 px-3">
                      <div className="min-w-0">
                        <div className="font-medium text-slate-200 truncate max-w-32.5">
                          {job.companyName}
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-32.5">
                          {job.isRemote ? (
                            <Globe className="w-3 h-3 text-slate-500 shrink-0" />
                          ) : (
                            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          )}

                          <span className="truncate">
                            {job.isRemote ? job.location || 'Remote' : job.location}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1e2330] text-slate-300 border border-slate-700/50">
                        {job.jobType}
                      </span>
                    </td>

                    {/* Compensation */}
                    <td className="py-3 px-3 font-semibold text-slate-100 whitespace-nowrap">
                      {job.minSalary}–{job.maxSalary}/{job.frequency}
                    </td>

                    {/* Applicants */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-indigo-300 font-medium">
                        <Users className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{job.applicantsCount ?? 0}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          job.status === 'Active'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40'
                            : 'bg-slate-800/40 text-slate-400 border-slate-700/40'
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            job.status === 'Active'
                              ? 'bg-emerald-400'
                              : 'bg-slate-500'
                          }`}
                        />

                        {job.status}
                      </span>
                    </td>

                    {/* Deadline */}
                    <td className="py-3 px-3">
                      <div className="min-w-0">
                        <div className="font-medium text-slate-200 truncate">
                          {job.deadline || 'No deadline'}
                        </div>

                        <div className="text-[10px] text-slate-500">
                          {job.postedDate}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">

                        <button
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded bg-[#1d2230] text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors border border-slate-700/50"
                          title="Update job details"
                        >
                          <Pencil className="w-3 h-3" />
                          Update
                        </button>

                        <button
                          className="p-1 rounded text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                          title="Delete job"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          className="p-1 rounded text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                          title="More options"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {jobs.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-10 text-center text-sm text-slate-500"
                    >
                      No jobs found.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageJobsPage;
