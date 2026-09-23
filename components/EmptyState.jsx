import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line py-20 text-center">
      <h3 className="font-display text-xl font-extrabold uppercase text-white">
        Nothing Here Yet
      </h3>
      <p className="max-w-xs text-sm italic text-zinc-400">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-accent px-5 py-2 text-sm font-bold uppercase text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
}
