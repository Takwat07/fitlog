"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Flame } from "lucide-react";
import { usePlan } from "@/app/context/PlanContext";

export default function HeroBanner() {
  const { plan, saved } = usePlan();
  const doneCount = plan.filter((item) => item.done).length;

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-[#0b0d10]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.png"
          alt="Gym Banner"
          fill
          priority
          className="object-cover opacity-35 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10] via-[#0b0d10]/85 to-[#0b0d10]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-semibold tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5" />
              <span>Daily Training System</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95] text-white">
              Train With Intent.{" "}
              <span className="text-[#ccff00] block sm:inline">
                Log Every Set.
              </span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Browse our curated library of strength, conditioning, and mobility
              movements. Lock in up to 5 exercises for today&apos;s session or
              bookmark routines for later.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#library"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccff00] text-black font-semibold text-sm hover:bg-[#b8e600] transition-colors"
              >
                <span>Browse Library</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <Link
                href="/my-plan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors"
              >
                <span>Open Today&apos;s Plan ({plan.length}/5)</span>
                <ArrowUpRight className="w-4 h-4 text-[#ccff00]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#12151b]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Session Status
                  </p>
                  <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white mt-0.5">
                    Today&apos;s Snapshot
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#ccff00]/15 text-[#ccff00] text-xs font-bold">
                  CAP: 5 LIFTS
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#0b0d10] border border-white/5 rounded-xl p-4">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#ccff00]">
                    {plan.length}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">In Plan</p>
                </div>

                <div className="bg-[#0b0d10] border border-white/5 rounded-xl p-4">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {doneCount}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Completed</p>
                </div>

                <div className="bg-[#0b0d10] border border-white/5 rounded-xl p-4">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {saved.length}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Saved</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                <span>12 movements available in library</span>
                <Link
                  href="/my-plan"
                  className="text-[#ccff00] hover:underline font-medium"
                >
                  Manage Plan →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}