import useHeatmap from '../hooks/useHeatmap';

function ActivityHeatmap() {
  const { heatmap, loading, error } = useHeatmap();

  if (loading) {
    return <p className="text-zinc-500 text-sm">Loading activity...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-sm">{error}</p>;
  }

  const sessionMap = {};
  heatmap.forEach((entry) => {
    const dateKey = new Date(entry.session_date).toISOString().split('T')[0];
    sessionMap[dateKey] = parseInt(entry.session_count);
  });

  const today = new Date();
  const days = [];
  for (let i = 119; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    days.push({ date: dateKey, count: sessionMap[dateKey] || 0 });
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getColor = (count) => {
    if (count === 0) return 'bg-zinc-700';
    if (count === 1) return 'bg-emerald-700';
    if (count === 2) return 'bg-emerald-500';
    return 'bg-emerald-300';
  };

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} session(s)`}
                className={`w-3.5 h-3.5 rounded-sm ${getColor(day.count)}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-zinc-400">
        <span>Less</span>
        <div className="w-3.5 h-3.5 rounded-sm bg-zinc-700" />
        <div className="w-3.5 h-3.5 rounded-sm bg-emerald-700" />
        <div className="w-3.5 h-3.5 rounded-sm bg-emerald-500" />
        <div className="w-3.5 h-3.5 rounded-sm bg-emerald-300" />
        <span>More</span>
      </div>
    </div>
  );
}

export default ActivityHeatmap;