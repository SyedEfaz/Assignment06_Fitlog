import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-4 max-w-md text-sm italic text-zinc-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-95"
          >
            Browse Workouts
            <span aria-hidden>↓</span>
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-line lg:max-w-none">
          <Image
            src="/images/hero.png"
            alt="Athlete training"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
