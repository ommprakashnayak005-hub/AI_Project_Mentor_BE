// Reusable priority badge with colour coding.
const PRIORITY_STYLES = {
  Low: 'badge-green',
  Medium: 'badge-orange',
  High: 'badge-red',
}

export default function PriorityBadge({ priority }) {
  const cls = PRIORITY_STYLES[priority] || 'badge-grey'
  return <span className={`badge ${cls}`}>{priority}</span>
}
