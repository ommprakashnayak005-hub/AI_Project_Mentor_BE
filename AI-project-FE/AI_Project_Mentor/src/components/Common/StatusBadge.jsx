// Reusable status badge. Maps a status string to a colour.
const STATUS_STYLES = {
  Pending: 'badge-yellow',
  'In Progress': 'badge-blue',
  Completed: 'badge-green',
}

export default function StatusBadge({ status }) {
  const cls = STATUS_STYLES[status] || 'badge-grey'
  return <span className={`badge ${cls}`}>{status}</span>
}
