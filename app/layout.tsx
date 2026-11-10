
import {
  Geist,
  Geist_Mono,
  Manrope,
  Space_Mono,
  Instrument_Sans,
  Plus_Jakarta_Sans,
  Inter_Tight,
} from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-space-mono",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        manrope.variable,
        spaceMono.variable,
        instrumentSans.variable,
        jakartaSans.variable,
        interTight.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Navbar initialSession={session} />

          {children}

          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
