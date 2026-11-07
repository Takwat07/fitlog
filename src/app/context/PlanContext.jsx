"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CheckCircle2, Info, AlertCircle } from "lucide-react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");

    if (storedPlan) {
      try {
        setPlan(JSON.parse(storedPlan));
      } catch (e) {
        setPlan([]);
      }
    }

    if (storedSaved) {
      try {
        setSaved(JSON.parse(storedSaved));
      } catch (e) {
        setSaved([]);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    }
  }, [plan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [saved, isLoaded]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToPlan = (workout) => {
    const workoutId = workout.id || workout._id;
    const exists = plan.some((item) => (item.id || item._id) === workoutId);

    if (exists) {
      showToast("Already in today's plan", "info");
      return;
    }

    if (plan.length >= 5) {
      showToast("Cap of 5 lifts reached for today!", "error");
      return;
    }

    setPlan((prev) => [...prev, { ...workout, done: false }]);
    showToast("Added to today's plan", "success");
  };

  const addToSaved = (workout) => {
    const workoutId = workout.id || workout._id;
    const exists = saved.some((item) => (item.id || item._id) === workoutId);

    if (exists) {
      showToast("Already saved for later", "info");
      return;
    }

    setSaved((prev) => [...prev, workout]);
    showToast("Saved for later", "success");
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => (item.id || item._id) !== id));
    showToast("Removed from today's plan", "info");
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((item) => (item.id || item._id) !== id));
    showToast("Removed from saved list", "info");
  };

  const markAsDone = (id) => {
    setPlan((prev) =>
      prev.map((item) =>
        (item.id || item._id) === id ? { ...item, done: !item.done } : item
      )
    );
    showToast("Workout marked as done!", "success");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        isLoaded,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#161920] border border-[#ccff00]/40 text-white px-4 py-3 rounded-xl shadow-2xl transition-all duration-300">
          {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#ccff00]" />}
          {toast.type === "info" && <Info className="w-5 h-5 text-[#ccff00]" />}
          {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-400" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}