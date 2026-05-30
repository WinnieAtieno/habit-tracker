export function useDashboardStats(habits) {
  const completedCount = habits.filter((h) => h.completed).length;

  const progress = habits.length
    ? Math.round((completedCount / habits.length) * 100)
    : 0;

  return { completedCount, progress };
}