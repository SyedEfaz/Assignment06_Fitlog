import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 px-4 py-32 text-center">
      <p className="font-display text-6xl font-extrabold text-accent">404</p>
      <h1 className="font-display text-2xl font-bold uppercase text-white">
        Page not found
      </h1>
      <p className="text-sm text-zinc-400">
        The lift you&apos;re looking for isn&apos;t in the library. Let&apos;s
        get you back on track.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase text-black"
      >
        Back to Workouts
      </Link>
    </div>
  );
}
