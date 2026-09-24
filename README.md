
FitLog

A dark, no-nonsense workout library. Browse the lift database, open any exercise for full instructions and specs, then build out today's session and track it as you go — no login required.

Technologies used
Next.js (App Router) — routing and rendering
React — component state and UI
Tailwind CSS — styling and responsive layout


Key features


1.Live workout library — every lift is fetched from a real API rather than hardcoded, with a sortable, searchable grid on the home page.

2.Detailed workout pages — each lift has its own page with equipment, difficulty, sets/reps, calories, a full spec table, and numbered step-by-step instructions.

3.Today's Plan with a hard cap — add up to five lifts to today's session; the app blocks and warns you once you hit the limit instead of letting the list grow indefinitely.

4.Save for later — bookmark any workout into a separate Saved list, independent of today's plan, so you can browse now and commit later.

5.Persistent state with live feedback — your plan and saved lists survive a page reload via localStorage, live stat counters (exercises, minutes, calories) update as you add or remove items, and every action confirms itself with a toast notification.







