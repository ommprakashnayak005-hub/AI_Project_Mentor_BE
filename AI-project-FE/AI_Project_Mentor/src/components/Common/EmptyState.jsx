// Empty-state placeholder used by lists and tables.
export default function EmptyState({ icon = '📭', title, message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="mb-2">{title}</h3>
      {message && <p className="muted text-sm">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
