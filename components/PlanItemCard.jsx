import Link from "next/link";
import Image from "next/image";
import StatRow from "./StatRow";

export default function PlanItemCard({ workout, onRemove, onMarkDone }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center ${
        workout.done ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-20 w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-24">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" sizes="120px" />
      </div>

      <div className="flex-1">
        <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
          {workout.name}
          {workout.done && (
            <span className="ml-2 text-xs font-semibold text-accent">✓ Done</span>
          )}
        </h4>
        <p className="text-xs text-zinc-500">{workout.equipment}</p>
        <div className="mt-1">
          <StatRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-white hover:border-accent"
        >
          View Details
        </Link>
        {onMarkDone && (
          <button
            onClick={() => onMarkDone(workout.id)}
            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-black"
          >
            ✓ {workout.done ? "Undo" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={() => onRemove(workout.id)}
          aria-label="Remove"
          className="rounded-lg border border-red-800 px-2.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-950/40"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
