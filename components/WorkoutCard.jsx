import Link from "next/link";
import Image from "next/image";
import StatRow from "./StatRow";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-card transition hover:border-accent/60"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
          {workout.name}
        </h3>
        <p className="text-xs text-zinc-500">{workout.equipment}</p>
        <div className="mt-auto pt-2">
          <StatRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
