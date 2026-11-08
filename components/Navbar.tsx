"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

import logo from "@/app/images/logo.png";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/company" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();

  console.log("Session in Navbar:", session);

  return (
    <header className="w-full bg-[#242426] px-4 py-4 sm:px-6">
      <nav className="mx-auto flex h-13.75 max-w-7xl items-center justify-between rounded-[14px] bg-[#1D1D1F] px-4 sm:px-5">

        {/* Desktop Logo */}
        <Link
          href="/"
          className="hidden shrink-0 md:block"
          onClick={() => setOpen(false)}
        >
          <Image
            src={logo}
            alt="Hireloop"
            width={115}
            height={40}
            priority
            className="h-auto w-26.25 object-contain sm:w-28.75"
          />
        </Link>

        {/* Mobile Navbar */}
        <div className="relative flex w-full items-center justify-between md:hidden">

          {/* Hamburger - Left */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="z-10 text-white hover:bg-white/10 hover:text-white"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Logo - Center */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src={logo}
              alt="Hireloop"
              width={115}
              height={40}
              priority
              className="h-auto w-26.25 object-contain"
            />
          </Link>

        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[12px] font-medium text-white transition-colors hover:text-[#8880FF]"
            >
              {link.name}
            </Link>
          ))}

          <div className="h-5 w-px bg-white/15" />

          <Link
            href="/sign-in"
            className="text-[13px] font-medium text-[#7665FF] transition-colors hover:text-[#A094FF]"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="flex h-9.75 items-center justify-center rounded-[10px] bg-linear-to-r from-[#7161F5] to-[#6253F5] px-4 text-[13px] font-medium text-white shadow-[0_3px_12px_rgba(99,83,245,0.25)] transition-all hover:brightness-110"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="left"
            className="w-72.5 border-white/10 bg-[#1D1D1F] text-white md:hidden"
          >
            <SheetTitle className="flex justify-center border-b border-white/10 pb-5">
              <Image
                src={logo}
                alt="Hireloop"
                width={115}
                height={40}
                className="h-auto w-27.5 object-contain"
              />
            </SheetTitle>

            <div className="mt-7 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="my-5 border-t border-white/10" />

            <div className="flex flex-col gap-3">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-center text-sm font-medium text-[#887AFF] hover:bg-white/5"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center rounded-lg bg-linear-to-r from-[#7161F5] to-[#6253F5] text-sm font-medium text-white transition-all hover:brightness-110"
              >
                Get Started
              </Link>
            </div>
          </SheetContent>
        </Sheet>

      </nav>
    </header>
  );
}