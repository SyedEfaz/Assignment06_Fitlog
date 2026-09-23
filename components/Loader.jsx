export default function Loader({ label = "Loading workouts..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-zinc-400">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
