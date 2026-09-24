"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getWorkoutById } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import Loader from "@/components/Loader";
import NotFoundState from "@/components/NotFoundState";

const SPEC_ROWS = [
  { label: "Equipment", key: "equipment" },
  { label: "Difficulty", key: "difficulty" },
  { label: "Sets", key: "sets" },
  { label: "Reps", key: "reps" },
  { label: "Duration", key: "duration", suffix: " min" },
  { label: "Calories", key: "caloriesBurned", suffix: " kcal" },
  { label: "Rating", key: "rating" },
];

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const { addToPlan, addToSaved, isPlanFull } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getWorkoutById(id)
      .then((data) => {
        if (!cancelled) setWorkout(Array.isArray(data) ? data[0] : data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Loader label="Loading workout..." />;

  if (error?.status === 404 || (!error && !workout)) {
    return (
      <NotFoundState
        title="Workout not found"
        message="That workout isn't in the library. Browse the available workouts instead."
        href="/#library"
      />
    );
  }

  if (error) {
    return (
      <p className="mx-auto max-w-2xl px-4 py-20 text-center text-sm text-red-300">
        Couldn&apos;t load this workout. Please try again.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line">
          <Image src={workout.image} alt={workout.name} fill className="object-cover" priority />
        </div>

        <div>
          <h1 className="font-display text-3xl font-extrabold uppercase text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 italic text-zinc-400">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-card px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-card">
            {SPEC_ROWS.map((row) => (
              <div key={row.label} className="flex justify-between px-4 py-2.5 text-sm">
                <dt className="font-semibold uppercase tracking-wide text-zinc-400">
                  {row.label}
                </dt>
                <dd className="font-bold text-white">
                  {workout[row.key]}
                  {row.suffix || ""}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <h2 className="font-display text-lg font-bold uppercase text-white">
              Instructions
            </h2>
            <ol className="mt-3 space-y-2 text-sm text-zinc-300">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)}
              aria-disabled={isPlanFull}
              className={`flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase text-black ${
                isPlanFull ? "opacity-50" : ""
              }`}
            >
              + Add to today&apos;s plan
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-sm font-bold uppercase text-white hover:border-accent"
            >
              ♥ Save for later
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
