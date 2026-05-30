import { habitMeta} from "../utils/habitMeta"

function CategorySelector({
  selectedCategory,
  onSelect,
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
        Select a Category
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(habitMeta).map(([id, config]) => {
          const Icon = config.icon;

          const isSelected =
            selectedCategory === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-500/20"
                  : "border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${config.styles}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span
                className={`text-xs font-bold ${
                  isSelected
                    ? "text-emerald-700"
                    : "text-slate-600"
                }`}
              >
                {id.charAt(0).toUpperCase() +
                  id.slice(1)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySelector;