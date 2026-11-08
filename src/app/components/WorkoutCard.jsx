"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Dumbbell, ArrowUpRight } from "lucide-react";

export default function WorkoutCard({ workout }) {
  const id = workout.id || workout._id;
  const title = workout.name || workout.title || "Workout Movement";
  const category = workout.category || workout.muscleGroup || workout.bodyPart || "Strength";
  const equipment = workout.equipment || "Bodyweight";
  const duration = workout.duration || workout.time || "20 min";
  const calories = workout.calories || workout.caloriesBurned || "180 kcal";
  const rating = workout.rating || "4.8";
  const difficulty = workout.difficulty || workout.level || "Intermediate";
  const image =
    workout.image ||
    workout.img ||
    workout.thumbnail ||
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80";

  return (
    <Link
      href={`/workout/${id}`}
      className="group bg-[#12151b] border border-white/5 hover:border-[#ccff00]/40 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden bg-[#181c24]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151b] via-transparent to-black/30" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[11px] font-semibold uppercase tracking-wider text-[#ccff00]">
            {category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/75 backdrop-blur-sm text-xs font-semibold text-white">
            <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
            {rating}
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm text-[11px] text-gray-200 font-medium">
            {difficulty}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#ccff00] transition-colors line-clamp-1">
              {title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#ccff00] shrink-0 transition-colors mt-1" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-gray-500" />
            <span className="capitalize">{equipment}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
            {duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
            {calories}
          </span>
        </div>
      </div>
    </Link>
  );
}