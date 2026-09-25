"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog_today_plan";
const SAVED_KEY = "fitlog_saved";
const PLAN_CAP = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted data on first mount
  useEffect(() => {
    try {
      const storedPlan = JSON.parse(localStorage.getItem(PLAN_KEY) || "[]");
      const storedSaved = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      setPlan(storedPlan);
      setSaved(storedSaved);
    } catch (e) {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist on change (skip the very first render before hydration)
  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const showToast = useCallback((message) => {
    toast(message);
  }, []);

  const addToPlan = useCallback(
    (workout) => {
      if (plan.some((item) => item.id === workout.id)) {
        showToast("Already in today's plan");
        return false;
      }
      if (plan.length >= PLAN_CAP) {
        showToast("Today's plan is full (max 5)");
        return false;
      }
      setPlan((current) => [...current, { ...workout, done: false }]);
      showToast("Added to today's plan");
      return true;
    },
    [plan, showToast]
  );

  const addToSaved = useCallback(
    (workout) => {
      if (saved.some((item) => item.id === workout.id)) {
        showToast("Already saved");
        return;
      }
      setSaved((current) => [...current, workout]);
      showToast("Saved for later");
    },
    [saved, showToast]
  );

  const removeFromPlan = useCallback(
    (id) => {
      setPlan((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from today's plan");
    },
    [showToast]
  );

  const removeFromSaved = useCallback(
    (id) => {
      setSaved((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from saved");
    },
    [showToast]
  );

  const markDone = useCallback(
    (id) => {
      setPlan((prev) => prev.filter((workout) => workout.id !== id));
      showToast("Workout marked as done");
    },
    [showToast]
  );

  const isPlanFull = plan.length >= PLAN_CAP;

  const metrics = {
    exercises: plan.length,
    minutes: plan.reduce((sum, w) => sum + (w.duration || 0), 0),
    calories: plan.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
        isPlanFull,
        metrics,
        showToast,
        hydrated,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
