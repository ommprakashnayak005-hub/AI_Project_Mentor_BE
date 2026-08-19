// Single summary stat card used at the top of the dashboard.
export default function StatCard({ label, value, icon, tone = 'primary' }) {
  const toneClass = `stat-card-icon badge-${tone}`
  return (
    <div className="stat-card">
      <div className={toneClass} aria-hidden="true">{icon}</div>
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
    </div>
  )
}
