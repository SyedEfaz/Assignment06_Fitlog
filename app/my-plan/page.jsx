"use client";

import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import PlanItemCard from "@/components/PlanItemCard";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";

const TABS = [
  { id: "plan", label: "Today's Plan" },
  { id: "saved", label: "Saved" },
];

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone, hydrated } =
    usePlan();
  const [tab, setTab] = useState("plan");

  const activeList = tab === "plan" ? plan : saved;
  const activeMetrics = activeList.reduce(
    (totals, workout) => ({
      exercises: totals.exercises + 1,
      minutes: totals.minutes + (Number(workout.duration) || 0),
      calories: totals.calories + (Number(workout.caloriesBurned) || 0),
    }),
    { exercises: 0, minutes: 0, calories: 0 }
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold uppercase text-white">
        My Plan
      </h1>
      <p className="mt-1 text-sm italic text-zinc-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard label="Exercises" value={activeMetrics.exercises} />
        <StatCard label="Minutes" value={activeMetrics.minutes} />
        <StatCard label="Calories" value={activeMetrics.calories} />
      </div>

      <div className="mt-8 flex gap-2 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
              tab === t.id
                ? "border-b-2 border-accent text-accent"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {!hydrated && <Loader label="Loading workouts…" />}

        {hydrated && activeList.length === 0 && <EmptyState />}

        {hydrated &&
          activeList.map((workout) => (
            <PlanItemCard
              key={workout.id}
              workout={workout}
              onRemove={tab === "plan" ? removeFromPlan : removeFromSaved}
              onMarkDone={tab === "plan" ? markDone : undefined}
            />
          ))}
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-card px-4 py-4 text-center">
      <p className="font-display text-2xl font-extrabold text-accent">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {label}
      </p>
    </div>
  );
}
