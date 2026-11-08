"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Trash2,
  Clock,
  Flame,
  Dumbbell,
  Bookmark,
  Plus,
  ArrowUpRight,
  Layers,
  Repeat,
} from "lucide-react";
import { usePlan } from "@/app/context/PlanContext";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("plan");

  const {
    plan,
    saved,
    addToPlan,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  useEffect(() => {
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "plan") {
      setActiveTab("plan");
    }
  }, [tabParam]);

  const completedCount = plan.filter((item) => item.done).length;
  const progressPercent =
    plan.length > 0 ? Math.round((completedCount / plan.length) * 100) : 0;

  const totalDuration = plan.reduce((acc, item) => {
    const num = parseInt(String(item.duration || item.time || 20), 10);
    return acc + (isNaN(num) ? 20 : num);
  }, 0);

  const totalCalories = plan.reduce((acc, item) => {
    const num = parseInt(String(item.calories || item.caloriesBurned || 180), 10);
    return acc + (isNaN(num) ? 180 : num);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#ccff00] font-semibold">
            Personal Dashboard
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-1">
            My Training Plan
          </h1>
          <p className="text-gray-400 text-sm mt-1.5">
            Track your daily 5-lift session cap, log completed sets, and manage bookmarked movements.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#12151b] p-1.5 rounded-xl border border-white/5 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>Today&apos;s Plan</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === "plan"
                  ? "bg-black/20 text-black"
                  : "bg-white/10 text-gray-300"
              }`}
            >
              {plan.length}/5
            </span>
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>Saved List</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === "saved"
                  ? "bg-black/20 text-black"
                  : "bg-white/10 text-gray-300"
              }`}
            >
              {saved.length}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#12151b] border border-white/5 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Session Load
          </p>
          <p className="font-display text-3xl font-bold text-white mt-1">
            {plan.length} <span className="text-lg text-gray-500">/ 5 Lifts</span>
          </p>
        </div>

        <div className="bg-[#12151b] border border-white/5 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Completed
          </p>
          <p className="font-display text-3xl font-bold text-[#ccff00] mt-1">
            {completedCount}{" "}
            <span className="text-sm font-sans font-normal text-gray-400">
              ({progressPercent}%)
            </span>
          </p>
        </div>

        <div className="bg-[#12151b] border border-white/5 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Est. Duration
          </p>
          <p className="font-display text-3xl font-bold text-white mt-1">
            {totalDuration} <span className="text-lg text-gray-500">min</span>
          </p>
        </div>

        <div className="bg-[#12151b] border border-white/5 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Est. Burn
          </p>
          <p className="font-display text-3xl font-bold text-white mt-1">
            {totalCalories} <span className="text-lg text-gray-500">kcal</span>
          </p>
        </div>
      </div>

      {plan.length > 0 && activeTab === "plan" && (
        <div className="bg-[#12151b] border border-white/5 rounded-2xl p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase tracking-wider text-gray-400 font-semibold">
              Daily Session Progress
            </span>
            <span className="text-[#ccff00] font-bold">
              {completedCount} of {plan.length} Completed
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#0b0d10] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ccff00] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {activeTab === "plan" ? (
        plan.length === 0 ? (
          <div className="bg-[#12151b] border border-white/5 rounded-2xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center mx-auto">
              <Dumbbell className="w-6 h-6 text-[#ccff00]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-bold uppercase text-white">
                No Lifts in Today&apos;s Plan
              </h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Your daily training queue is empty. Add up to 5 exercises from the workout library to start logging your session.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccff00] text-black font-semibold text-sm hover:bg-[#b8e600] transition-colors"
            >
              <span>Browse Library</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {plan.map((item) => {
              const id = item.id || item._id;
              const title = item.name || item.title || "Workout Movement";
              const category =
                item.category || item.muscleGroup || item.bodyPart || "Strength";
              const sets = item.sets || 4;
              const reps = item.reps || "8-12";
              const duration = item.duration || item.time || 20;
              const calories = item.calories || item.caloriesBurned || 180;
              const image =
                item.image ||
                item.img ||
                item.thumbnail ||
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80";

              return (
                <div
                  key={id}
                  className={`bg-[#12151b] border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all ${
                    item.done
                      ? "border-[#ccff00]/40 bg-[#12151b]/60"
                      : "border-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Link
                      href={`/workout/${id}`}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#181c24] shrink-0"
                    >
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#ccff00]/10 text-[#ccff00] text-[10px] font-bold uppercase tracking-wider">
                          {category}
                        </span>
                        {item.done && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                            Completed
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/workout/${id}`}
                        className={`font-display text-xl font-bold uppercase tracking-wide block hover:text-[#ccff00] transition-colors ${
                          item.done ? "line-through text-gray-500" : "text-white"
                        }`}
                      >
                        {title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-[#ccff00]" />
                          {sets} Sets
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Repeat className="w-3.5 h-3.5 text-[#ccff00]" />
                          {reps} Reps
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                          {String(duration).includes("min")
                            ? duration
                            : `${duration} min`}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
                          {String(calories).includes("kcal")
                            ? calories
                            : `${calories} kcal`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                    <button
                      onClick={() => markAsDone(id)}
                      className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        item.done
                          ? "bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30"
                          : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                      }`}
                    >
                      {item.done ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Done</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4" />
                          <span>Mark as Done</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => removeFromPlan(id)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/5 transition-colors cursor-pointer"
                      title="Remove from Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : saved.length === 0 ? (
        <div className="bg-[#12151b] border border-white/5 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-2xl font-bold uppercase text-white">
              No Saved Workouts
            </h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Bookmark exercises you want to try in future training blocks and they will appear here.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccff00] text-black font-semibold text-sm hover:bg-[#b8e600] transition-colors"
          >
            <span>Explore Workouts</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {saved.map((item) => {
            const id = item.id || item._id;
            const title = item.name || item.title || "Workout Movement";
            const category =
              item.category || item.muscleGroup || item.bodyPart || "Strength";
            const duration = item.duration || item.time || 20;
            const calories = item.calories || item.caloriesBurned || 180;
            const image =
              item.image ||
              item.img ||
              item.thumbnail ||
              "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80";

            return (
              <div
                key={id}
                className="bg-[#12151b] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <Link
                    href={`/workout/${id}`}
                    className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#181c24] shrink-0"
                  >
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-[#ccff00]/10 text-[#ccff00] text-[10px] font-bold uppercase tracking-wider">
                      {category}
                    </span>
                    <Link
                      href={`/workout/${id}`}
                      className="font-display text-lg font-bold uppercase text-white hover:text-[#ccff00] transition-colors block"
                    >
                      {title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>
                        {String(duration).includes("min")
                          ? duration
                          : `${duration} min`}
                      </span>
                      <span>•</span>
                      <span>
                        {String(calories).includes("kcal")
                          ? calories
                          : `${calories} kcal`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => addToPlan(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ccff00] text-black font-semibold text-xs hover:bg-[#b8e600] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Plan</span>
                  </button>

                  <button
                    onClick={() => removeFromSaved(id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/5 transition-colors cursor-pointer"
                    title="Remove from Saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="h-12 w-64 bg-[#12151b] rounded-xl animate-pulse" />
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}