import Link from "next/link";

export default function NotFoundState({
  title = "Page not found",
  message = "The page you're looking for isn't here. Let's get you back on track.",
  href = "/",
  linkLabel = "Back to Workouts",
}) {
  return (
    <section className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <p className="font-display text-6xl font-extrabold text-accent">404</p>
      <h1 className="font-display text-2xl font-bold uppercase text-white">
        {title}
      </h1>
      <p className="text-sm text-zinc-400">{message}</p>
      <Link
        href={href}
        className="mt-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase text-black"
      >
        {linkLabel}
      </Link>
    </section>
  );
}
