function FrequencySelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
        How Often?
      </label>

      <div className="flex gap-4">
        {["daily", "weekly"].map((freq) => (
          <label
            key={freq}
            className="flex items-center gap-2.5 cursor-pointer bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60 flex-1 hover:bg-slate-100/70 transition"
          >
            <input
              type="radio"
              name="frequency"
              checked={value === freq}
              onChange={() => onChange(freq)}
              className="w-4 h-4 accent-emerald-600"
            />

            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 capitalize">
              {freq}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FrequencySelector;