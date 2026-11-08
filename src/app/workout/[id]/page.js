"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Flame,
  Star,
  Dumbbell,
  CheckCircle2,
  Bookmark,
  Plus,
  Layers,
  Repeat,
  Target,
} from "lucide-react";
import { usePlan } from "@/app/context/PlanContext";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchWorkoutDetails() {
      try {
        setLoading(true);
        let res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        if (!res.ok) {
          res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`);
        }
        const json = await res.json();
        const item = json?.data || json;

        if (item && (item.id || item._id || item.name || item.title)) {
          setWorkout(item);
        } else {
          const allRes = await fetch("https://api.abcz.workers.dev/api/fitlog");
          const allJson = await allRes.json();
          const list = Array.isArray(allJson) ? allJson : allJson.data || [];
          const found = list.find(
            (w) => String(w.id || w._id) === String(id)
          );
          setWorkout(found || null);
        }
      } catch (err) {
        try {
          const allRes = await fetch("https://api.api-store.workers.dev/api/fitlog");
          const allJson = await allRes.json();
          const list = Array.isArray(allJson) ? allJson : allJson.data || [];
          const found = list.find(
            (w) => String(w.id || w._id) === String(id)
          );
          setWorkout(found || null);
        } catch (e) {
          setWorkout(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWorkoutDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="h-6 w-40 bg-[#12151b] rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 h-96 bg-[#12151b] rounded-2xl animate-pulse" />
          <div className="lg:col-span-6 space-y-4">
            <div className="h-10 w-3/4 bg-[#12151b] rounded animate-pulse" />
            <div className="h-24 w-full bg-[#12151b] rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-[#12151b] rounded-xl animate-pulse" />
              <div className="h-20 bg-[#12151b] rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-display text-3xl font-bold uppercase text-white">
          Workout Not Found
        </h2>
        <p className="text-gray-400 text-sm">
          The exercise you are looking for does not exist or could not be loaded.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ccff00] text-black font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>
    );
  }

  const workoutId = workout.id || workout._id;
  const title = workout.name || workout.title || "Workout Movement";
  const category =
    workout.category || workout.muscleGroup || workout.bodyPart || "Strength";
  const difficulty = workout.difficulty || workout.level || "Intermediate";
  const equipment = Array.isArray(workout.equipment)
    ? workout.equipment.join(", ")
    : workout.equipment || "Barbell / Bodyweight";
  const targetMuscle = Array.isArray(workout.targetMuscles || workout.muscles)
    ? (workout.targetMuscles || workout.muscles).join(", ")
    : workout.targetMuscle || workout.muscleGroup || workout.bodyPart || "Full Body";
  const duration = workout.duration || workout.time || 20;
  const calories = workout.calories || workout.caloriesBurned || 180;
  const sets = workout.sets || 4;
  const reps = workout.reps || "8-12";
  const rating = workout.rating || 4.8;
  const description =
    workout.description ||
    workout.overview ||
    "Focus on controlled eccentric tempo, full range of motion, and bracing your core throughout every repetition.";
  const image =
    workout.image ||
    workout.img ||
    workout.thumbnail ||
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80";

  const rawInstructions =
    workout.instructions ||
    workout.steps ||
    workout.formCues || [
      "Set up your starting posture with a neutral spine and braced core.",
      "Initiate the movement with control, focusing on the primary target muscle group.",
      "Pause briefly at peak contraction while maintaining tension.",
      "Return to the starting position slowly and repeat for the prescribed reps.",
    ];

  const instructions = Array.isArray(rawInstructions)
    ? rawInstructions
    : typeof rawInstructions === "string"
    ? rawInstructions.split(". ").filter(Boolean)
    : [];

  const isInPlan = plan.some((item) => String(item.id || item._id) === String(workoutId));
  const isSaved = saved.some((item) => String(item.id || item._id) === String(workoutId));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-12">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-400 hover:text-[#ccff00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-6">
          <div className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden bg-[#12151b] border border-white/10">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-black/25" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#ccff00]">
                {category}
              </span>
              <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-xs font-medium text-white">
                {difficulty}
              </span>
            </div>

            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/80 backdrop-blur-sm text-xs font-bold text-white">
                <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
                {rating}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              {title}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#12151b] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Layers className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Sets</span>
              </div>
              <p className="font-display text-2xl font-bold text-white mt-1">
                {sets}
              </p>
            </div>

            <div className="bg-[#12151b] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Repeat className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Reps</span>
              </div>
              <p className="font-display text-2xl font-bold text-white mt-1">
                {reps}
              </p>
            </div>

            <div className="bg-[#12151b] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Duration</span>
              </div>
              <p className="font-display text-2xl font-bold text-white mt-1">
                {String(duration).includes("min") ? duration : `${duration} min`}
              </p>
            </div>

            <div className="bg-[#12151b] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Burn</span>
              </div>
              <p className="font-display text-2xl font-bold text-white mt-1">
                {String(calories).includes("kcal") ? calories : `${calories} kcal`}
              </p>
            </div>
          </div>

          <div className="bg-[#12151b] border border-white/5 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center shrink-0">
                <Dumbbell className="w-4 h-4 text-[#ccff00]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-400">
                  Equipment Needed
                </p>
                <p className="text-sm font-semibold text-white capitalize">
                  {equipment}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 text-[#ccff00]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-400">
                  Target Zone
                </p>
                <p className="text-sm font-semibold text-white capitalize">
                  {targetMuscle}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                isInPlan
                  ? "bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/40"
                  : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
              }`}
            >
              {isInPlan ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Added to Today&apos;s Plan</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Today&apos;s Plan</span>
                </>
              )}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all cursor-pointer ${
                isSaved
                  ? "bg-white/15 text-white border-white/30"
                  : "bg-[#12151b] hover:bg-white/10 text-gray-200 border-white/10"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
              <span>{isSaved ? "Saved" : "Save for Later"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#12151b] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/5 pb-4">
          <p className="text-xs uppercase tracking-widest text-[#ccff00] font-semibold">
            Execution Guide
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mt-1">
            Step-by-Step Instructions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {instructions.map((step, index) => (
            <div
              key={index}
              className="bg-[#0b0d10] border border-white/5 rounded-xl p-5 flex items-start gap-4"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#ccff00]/15 border border-[#ccff00]/30 font-display text-sm font-bold text-[#ccff00] shrink-0">
                0{index + 1}
              </span>
              <p className="text-sm text-gray-300 leading-relaxed pt-1">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}