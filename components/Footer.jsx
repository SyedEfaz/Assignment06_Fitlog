import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-zinc-400 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="FitLog logo" width={22} height={22} className="rounded" />
          <span className="font-display font-bold uppercase tracking-wide text-white">
            FitLog
          </span>
        </div>
        <p className="italic">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
