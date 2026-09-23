export default function StatRow({ duration, calories, rating }) {
  return (
    <div className="flex items-center gap-4 text-xs text-zinc-400">
      <span className="flex items-center gap-1">
        <span aria-hidden>⏱</span> {duration} min
      </span>
      <span className="flex items-center gap-1">
        <span aria-hidden>🔥</span> {calories} kcal
      </span>
      <span className="flex items-center gap-1">
        <span aria-hidden>⭐</span> {rating}
      </span>
    </div>
  );
}
