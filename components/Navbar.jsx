"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const LINKS = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="FitLog logo" width={28} height={28} className="rounded" />
          <span className="font-display text-lg font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <ul className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wide transition ${
                    active ? "text-accent" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-6 text-sm font-medium text-white">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label={`Plan, ${plan.length} workouts`}
          >
            <span>Plan</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label={`Saved, ${saved.length} workouts`}
          >
            <span>Saved</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 text-xs font-bold text-gray-300">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>

      {/* mobile nav links */}
      <ul className="flex items-center justify-center gap-6 border-t border-line py-2 sm:hidden">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-wide ${
                  active ? "text-accent" : "text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
