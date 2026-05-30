import HabitItem from "./HabitItem";

export default function HabitList({ habits, filter, toggleComplete }) {
  const filtered = habits.filter(
    (h) => filter === "all" || h.category === filter
  );

  return (
    <div className="overflow-y-auto flex-1 p-2">
      <ul className="space-y-2">
        {filtered.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm font-medium text-slate-400">
            No habits found.
          </p>
        </div>
      )}
    </div>
  );
}