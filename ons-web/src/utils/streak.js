import { todayISO, daysBetween } from "./date";

export function nextStreak(lastCompletedDate, streak){
  const today = todayISO();
  if (!lastCompletedDate) return 1;
  const delta = daysBetween(lastCompletedDate, today);
  if (delta === 0) return streak;
  if (delta === 1) return streak + 1;
  return 1;
}
