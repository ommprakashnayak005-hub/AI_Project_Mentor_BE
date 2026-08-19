import StatusBadge from '../Common/StatusBadge'
import PriorityBadge from '../Common/PriorityBadge'

// Table of the most recently updated tasks shown on the dashboard.
export default function RecentTasksTable({ tasks, projects }) {
  const projectName = (projectId) =>
    projects.find((p) => p.id === projectId)?.name || 'Unknown'

  const recent = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Project</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{projectName(task.projectId)}</td>
              <td><PriorityBadge priority={task.priority} /></td>
              <td><StatusBadge status={task.status} /></td>
              <td className="muted text-sm">{task.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
