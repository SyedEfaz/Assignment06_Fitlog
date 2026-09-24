"use client";

import { usePlan } from "@/context/PlanContext";

export default function ToastStack() {
  const { toasts } = usePlan();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-[fadeIn_0.2s_ease-out] rounded-lg border border-line bg-card px-4 py-3 text-sm font-medium text-white shadow-lg shadow-black/40"
        >
          <span className="mr-2 text-accent" aria-hidden="true">●</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
