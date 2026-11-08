"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  BriefcaseBusiness,
  UserRound,
  Building2,
  ShieldCheck,
} from "lucide-react";

type UserRole = "seeker" | "recruiter" | "admin";

const SignUpPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [role, setRole] = useState<UserRole>("seeker");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Account creation failed!");
        return;
      }

      if (data) {
        toast.success("Account created successfully!", {
          description: `Welcome to HireLoop as ${role}!`,
        });

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign Up Error:", error);
      toast.error("Something went wrong!", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Google signup remains unchanged for now.
  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google sign up failed!");
        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google Sign Up Error:", error);
      toast.error("Unable to continue with Google!");
      setIsGoogleLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#171722] px-4 py-3.5 text-sm text-white placeholder:text-gray-500 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10";

  const roles = [
    {
      value: "seeker",
      label: "Seeker",
      description: "Find jobs",
      icon: UserRound,
    },
    {
      value: "recruiter",
      label: "Recruiter",
      description: "Hire talent",
      icon: Building2,
    },
    {
      value: "admin",
      label: "Admin",
      description: "Manage platform",
      icon: ShieldCheck,
    },
  ] as const;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08080D] px-4 py-10 text-white">
      <div className="pointer-events-none absolute -left-40 -top-60 h-[500px] w-[500px] rounded-full bg-violet-700/20 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-60 -right-40 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[150px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#101018] shadow-2xl md:grid-cols-2">

        {/* Left Side */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#19162D] via-[#11111C] to-[#0D0D15] p-12 md:flex">
          <Link href="/" className="text-3xl font-extrabold">
            <span className="text-blue-400">hire</span>
            <span className="text-orange-400">loop</span>
            <span className="text-violet-400">.</span>
          </Link>

          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
              <Sparkles size={15} />
              START YOUR JOURNEY
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Your Future
              <br />
              Starts
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                With Us.
              </span>
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-gray-400">
              Join HireLoop and unlock new career opportunities. Connect with
              employers, discover exciting jobs, and make your professional
              dreams a reality.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BriefcaseBusiness size={17} className="text-violet-400" />
              One account. Endless opportunities.
            </div>

            <p className="mt-5 text-xs text-gray-600">
              © 2026 HireLoop. All rights reserved.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
          <Link href="/" className="mb-8 text-3xl font-extrabold md:hidden">
            <span className="text-blue-400">hire</span>
            <span className="text-orange-400">loop</span>
            <span className="text-violet-400">.</span>
          </Link>

          <div className="mb-7">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-violet-400">
              <Sparkles size={15} />
              Join HireLoop
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create Account
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Create your account and start exploring opportunities.
            </p>
          </div>

          {/* Account Type */}
          <div className="mb-7">
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-200">
                Choose Account Type
              </label>
              <span className="text-xs text-violet-400">Required</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {roles.map((item) => {
                const Icon = item.icon;
                const isSelected = role === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setRole(item.value)}
                    className={`group relative flex min-w-0 flex-col items-center rounded-2xl border p-3 transition-all duration-300 sm:p-4 ${
                      isSelected
                        ? "border-violet-500/80 bg-gradient-to-b from-violet-500/15 to-indigo-500/5 shadow-[0_0_25px_rgba(139,92,246,0.13)]"
                        : "border-white/[0.08] bg-[#171722]/80 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#1D1B2A]"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500 text-white">
                        <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3">
                          <path
                            d="m5 10 3 3 7-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}

                    <div
                      className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25"
                          : "bg-white/[0.06] text-gray-400 group-hover:bg-violet-500/10 group-hover:text-violet-300"
                      }`}
                    >
                      <Icon size={21} />
                    </div>

                    <span
                      className={`text-xs font-bold sm:text-sm ${
                        isSelected ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {item.label}
                    </span>

                    <span className="mt-1 text-center text-[10px] leading-4 text-gray-500 sm:text-xs">
                      {item.description}
                    </span>

                    <div
                      className={`mt-3 h-1 w-8 rounded-full transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-r from-violet-500 to-indigo-500"
                          : "bg-white/10 group-hover:bg-violet-500/40"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Select the account type that matches your purpose.
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-semibold shadow-lg shadow-violet-900/20 transition-all hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && (
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#101018] px-4 text-gray-500">
                OR SIGN UP WITH
              </span>
            </div>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading || isGoogleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#171722] py-3.5 text-sm font-medium text-white transition-all hover:border-violet-500/50 hover:bg-[#20202D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15z" />
              <path fill="#34A853" d="M24 44c5.6 0 10.3-1.9 13.8-5.1l-6.6-5.1c-1.9 1.3-4.3 2-7.2 2-5.5 0-10.1-3.7-11.8-8.7H5.4v5.3A20.9 20.9 0 0 0 24 44z" />
              <path fill="#4A90E2" d="M12.2 27.1a12.5 12.5 0 0 1 0-7.9v-5.3H5.4a20.9 20.9 0 0 0 0 18.5z" />
              <path fill="#EA4335" d="M24 11.3c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.2 29.5 4 24 4A20.9 20.9 0 0 0 5.4 13.9l6.8 5.3c1.7-5 6.3-7.9 11.8-7.9z" />
            </svg>

            {isGoogleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <p className="mt-7 text-center text-sm text-gray-400">
            Already have an account?
            <Link
              href="/sign-in"
              className="ml-1.5 font-semibold text-violet-400 hover:text-violet-300"
            >
              Sign In
            </Link>
          </p>

          <p className="mt-7 text-center text-xs text-gray-600">
            © 2026 HireLoop. All rights reserved.
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;