"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";
import SortDropdown from "./SortDropdown";
import Loader from "./Loader";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    getAllWorkouts()
      .then((data) => {
        if (!cancelled) setWorkouts(data);
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
  }, []);

  const visibleWorkouts = useMemo(() => {
    const filtered = workouts.filter((w) => {
      const haystack = `${w.name} ${w.muscleGroups.join(" ")}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
    const sortKey = sortBy === "caloriesBurned" ? "caloriesBurned" : sortBy;
    return [...filtered].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase text-white">
            The Library
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tag..."
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-accent focus:outline-none"
          />
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {loading && <Loader label="Loading workouts..." />}

      {!loading && error && (
        <p className="rounded-lg border border-red-900 bg-red-950/40 p-4 text-sm text-red-300">
          Couldn&apos;t load workouts: {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
          {visibleWorkouts.length === 0 && (
            <p className="col-span-full text-center text-sm text-zinc-500">
              No workouts match &quot;{query}&quot;.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
