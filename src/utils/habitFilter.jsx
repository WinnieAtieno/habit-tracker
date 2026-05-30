export const filterHabits = (habits, filter) => {
  if (filter === "all") return habits;
  return habits.filter((h) => h.category === filter);
};
