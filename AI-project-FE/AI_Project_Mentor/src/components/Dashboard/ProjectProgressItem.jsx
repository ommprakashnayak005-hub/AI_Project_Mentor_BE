// Progress bar for a single project in the dashboard progress section.
export default function ProjectProgressItem({ project, tasks }) {
  const projectTasks = tasks.filter((t) => t.projectId === project.id)
  const total = projectTasks.length
  const completed = projectTasks.filter((t) => t.status === 'Completed').length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="card mb-4">
      <div className="flex-between mb-2">
        <strong>{project.name}</strong>
        <span className="muted text-sm">
          {completed}/{total} tasks · {percent}%
        </span>
      </div>
      <div className="stack-row mb-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
      <div className="progress" aria-label="Project completion progress">
        <div className="progress-bar" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
