"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/app/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 bg-[#0b0d10]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="font-display text-xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
              isWorkoutsActive
                ? "bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
              isMyPlanActive
                ? "bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-[#ccff00] text-black text-xs font-bold">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full border border-white/25 text-gray-300 text-xs font-semibold">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}