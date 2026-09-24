FitLog

A dark, no-nonsense workout library. Browse the lift database, open any exercise for full instructions and specs, then build out today's session and track it as you go — no login required.

Technologies used



Next.js (App Router) — file-based routing for the home, workout detail, and My Plan pages, with client components handling interactive state where needed.
React — component state and UI, including a shared PlanContext (React Context + hooks) that manages today's plan, saved workouts, and toast notifications across the whole app.
Tailwind CSS — a fully custom dark theme (deep surface/card backgrounds, a single accent color) with a responsive grid that adapts from a single column on mobile up to a multi-column library layout on desktop.



Key features
1.Live workout library — every lift is fetched at runtime from a real external API rather than hardcoded into the app, and displayed as a sortable, searchable grid on the home page so you can find a lift by name, muscle group, duration, calories, or rating.
2.Detailed workout pages — each lift has its own dedicated page, dynamically generated from its API id, showing the equipment needed, difficulty level, sets/reps, calorie burn, a full spec table, and numbered, step-by-step instructions for performing the lift correctly.
3.Today's Plan with a hard cap — add up to five lifts to today's session directly from any workout page; once the plan hits that limit, the app disables further additions and warns you with a toast instead of letting the list grow without bound, keeping each day's session realistically sized.
4.Save for later — bookmark any workout into a separate Saved list that's completely independent of today's plan, so you can browse the full library at your own pace and commit specific lifts to a session whenever you're ready.
5.Persistent state with live feedback — your plan and saved lists are written to the browser's localStorage on every change, so they survive a page reload or closed tab without needing an account. Live stat counters (exercises, minutes, calories) recalculate instantly as you add, remove, or complete items, and every action — adding, saving, removing, marking done — confirms itself with a toast notification so you always know the app registered your input.






