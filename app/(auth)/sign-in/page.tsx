
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
} from "lucide-react";

const SignInPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signIn.email({
        email: formData.email.trim(),
        password: formData.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
        return;
      }

      if (data) {
        toast.success("Signed in successfully!", {
          description: "Welcome back to HireLoop!",
        });

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign In Error:", error);
      toast.error("Something went wrong!", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google sign in failed!");
        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      toast.error("Unable to continue with Google!");
      setIsGoogleLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#171722] px-4 py-3.5 text-sm text-white placeholder:text-gray-500 outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10";

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
              YOUR NEXT CHAPTER STARTS HERE
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Welcome
              <br />
              Back to
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                HireLoop.
              </span>
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-gray-400">
              Sign in and continue your journey. Discover exciting
              opportunities and connect with companies that value your talent.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BriefcaseBusiness size={17} className="text-violet-400" />
              Your career journey starts here.
            </div>
            <p className="mt-5 text-xs text-gray-600">
              © 2026 HireLoop. All rights reserved.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex flex-col justify-center p-7 sm:p-12">
          <Link href="/" className="mb-10 text-3xl font-extrabold md:hidden">
            <span className="text-blue-400">hire</span>
            <span className="text-orange-400">loop</span>
            <span className="text-violet-400">.</span>
          </Link>

          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-violet-400">
              <Sparkles size={15} />
              Welcome Back
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sign In
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Toggle */}
          <div className="mb-7 grid grid-cols-2 gap-2 rounded-xl bg-[#191923] p-1.5">
            <Link
              href="/sign-in"
              className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-center text-sm font-semibold text-white"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="rounded-lg py-3 text-center text-sm font-semibold text-gray-400 transition hover:text-white"
            >
              Sign Up
            </Link>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  toast.info("Forgot password feature is not available yet.")
                }
                className="text-sm text-violet-400 hover:text-violet-300"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-semibold shadow-lg shadow-violet-900/20 transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing In..." : "Sign In"}

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
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
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

          <p className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?
            <Link
              href="/sign-up"
              className="ml-1.5 font-semibold text-violet-400 hover:text-violet-300"
            >
              Create Account
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-gray-600">
            © 2026 HireLoop. All rights reserved.
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignInPage;
