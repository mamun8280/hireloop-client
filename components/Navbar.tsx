
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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

  return (
    <header className="w-full bg-[#242426] px-4 py-4 sm:px-6">
      <nav className="max-w-7xl mx-auto flex h-[55px]  items-center justify-between rounded-[14px] bg-[#1D1D1F] px-4 sm:px-5">

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src={logo}
            alt="Hireloop"
            width={115}
            height={40}
            priority
            className="h-auto w-[105px] object-contain sm:w-[115px]"
          />
        </Link>

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

          {/* Divider */}
          <div className="h-5 w-px bg-white/15" />

          {/* Sign In */}
          <Link
            href="/sign-in"
            className="text-[13px] font-medium text-[#7665FF] transition-colors hover:text-[#A094FF]"
          >
            Sign In
          </Link>

          {/* Get Started */}
          <Link
            href="/register"
            className="flex h-[39px] items-center justify-center rounded-[10px] bg-gradient-to-r from-[#7161F5] to-[#6253F5] px-4 text-[13px] font-medium text-white shadow-[0_3px_12px_rgba(99,83,245,0.25)] transition-all hover:brightness-110"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="text-white hover:bg-white/10 hover:text-white md:hidden"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Mobile Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="right"
            className="w-[290px] border-white/10 bg-[#1D1D1F] text-white md:hidden"
          >
            <SheetTitle className="border-b border-white/10 pb-5">
              <Image
                src={logo}
                alt="Hireloop"
                width={115}
                height={40}
                className="h-auto w-[110px] object-contain"
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
                className="flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-[#7161F5] to-[#6253F5] text-sm font-medium text-white transition-all hover:brightness-110"
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
