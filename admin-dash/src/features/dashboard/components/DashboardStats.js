function DashboardStats({
  title = "",
  icon = null,
  value = 0,
  description = "",
  colorIndex = 0,
}) {
  const COLORS = ["primary", "secondary"]; // Customize with your theme color names

  const getDescStyle = () => {
    if (description?.includes("↗︎"))
      return "font-bold text-green-700 dark:text-green-300";
    if (description?.includes("↙"))
      return "font-bold text-rose-500 dark:text-red-400";
    return "";
  };

  return (
    <div className="stats shadow">
      <div className="stat">
        <div
          className={`stat-figure text-${
            COLORS[colorIndex % COLORS.length]
          } dark:text-slate-300`}
        >
          {icon}
        </div>
        <div className="stat-title dark:text-slate-300">{title}</div>
        <div
          className={`stat-value text-${
            COLORS[colorIndex % COLORS.length]
          } dark:text-slate-300`}
        >
          {value}
        </div>
        {description && (
          <div className={`stat-desc ${getDescStyle()}`}>{description}</div>
        )}
      </div>
    </div>
  );
}

export default DashboardStats;
