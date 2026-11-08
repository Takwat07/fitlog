"use client";

import { useEffect, useState } from "react";
import HeroBanner from "@/app/components/HeroBanner";
import WorkoutCard from "@/app/components/WorkoutCard";
import { Dumbbell, Filter } from "lucide-react";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        let res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) {
          res = await fetch("https://api.api-store.workers.dev/api/fitlog");
        }
        const data = await res.json();
        setWorkouts(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        try {
          const resBackup = await fetch("https://api.api-store.workers.dev/api/fitlog");
          const backupData = await resBackup.json();
          setWorkouts(Array.isArray(backupData) ? backupData : backupData.data || []);
        } catch (e) {
          setWorkouts([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  const categories = [
    "All",
    ...new Set(
      workouts
        .map((w) => w.category || w.muscleGroup || w.bodyPart)
        .filter(Boolean)
    ),
  ];

  const filteredWorkouts =
    activeCategory === "All"
      ? workouts
      : workouts.filter((w) => {
          const cat = w.category || w.muscleGroup || w.bodyPart;
          return cat?.toLowerCase() === activeCategory.toLowerCase();
        });

  return (
    <div className="min-h-screen pb-20">
      <HeroBanner />

      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[#ccff00] text-xs font-semibold tracking-widest uppercase">
              <Dumbbell className="w-4 h-4" />
              <span>Exercise Catalog</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mt-1">
              The Library
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Select an exercise to inspect form cues, target zones, and add to your daily stack.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-gray-500 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#ccff00] text-black"
                    : "bg-[#161920] text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#12151b] border border-white/5 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : filteredWorkouts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-sm">No exercises found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id || workout._id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}