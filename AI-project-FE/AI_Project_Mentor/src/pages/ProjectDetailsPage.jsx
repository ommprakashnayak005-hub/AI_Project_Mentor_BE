import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import EmptyState from '../components/Common/EmptyState'
import ProjectForm from '../components/Projects/ProjectForm'
import StatusBadge from '../components/Common/StatusBadge'
import PriorityBadge from '../components/Common/PriorityBadge'
import SuccessMessage from '../components/Common/SuccessMessage'

// Single project view with its details and the tasks belonging to it.
export default function ProjectDetailsPage({ projects, setProjects, tasks, setTasks }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(null)
  const [success, setSuccess] = useState('')

  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <EmptyState
        icon="📁"
        title="Project could not be found"
        message="The project you are looking for does not exist."
        action={
          <Link className="btn btn-primary" to="/projects">Back to Projects</Link>
        }
      />
    )
  }

  const projectTasks = tasks.filter((t) => t.projectId === project.id)
  const completed = projectTasks.filter((t) => t.status === 'Completed').length
  const total = projectTasks.length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  function handleEdit(data) {
    setProjects(
      projects.map((p) => (p.id === project.id ? { ...p, ...data } : p))
    )
    setEditing(null)
    setSuccess('Project updated successfully.')
  }

  return (
    <div>
      {success && <SuccessMessage message={success} />}

      <div className="page-header">
        <h1>{project.name}</h1>
        <div className="action-buttons">
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/tasks')}>
            + Add Task
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setEditing(project)}>
            Edit Project
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/ai-mentor')}
          >
            Ask AI Mentor
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate('/projects')}
          >
            ← Return to Projects
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <p className="mb-2"><strong>Description:</strong> {project.description}</p>
        <div className="stack-row mb-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
        <p className="muted text-sm mb-2">Created {project.createdAt}</p>
        <p className="mb-2">
          <strong>Tasks:</strong> {completed} completed / {total} total
        </p>
        <div className="progress" aria-label="Overall progress">
          <div className="progress-bar" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <h2 className="mb-4">Tasks</h2>
      {projectTasks.length === 0 ? (
        <EmptyState
          icon="✓"
          title="No tasks for this project"
          message="Add a task to start tracking work for this project."
        />
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {projectTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td><PriorityBadge priority={task.priority} /></td>
                  <td><StatusBadge status={task.status} /></td>
                  <td className="muted text-sm">{task.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title="Edit Project" onClose={() => setEditing(null)}>
          <ProjectForm
            initialData={editing}
            onSave={handleEdit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </div>
  )
}
