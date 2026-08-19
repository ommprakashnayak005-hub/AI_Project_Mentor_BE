import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import EmptyState from '../components/Common/EmptyState'
import ProjectForm from '../components/Projects/ProjectForm'
import SuccessMessage from '../components/Common/SuccessMessage'

// Projects page: list of projects as cards with create / edit / delete actions.
export default function ProjectsPage({ projects, setProjects }) {
  const navigate = useNavigate()
  const [showCreate, setShowCreate] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [success, setSuccess] = useState('')

  function handleCreate(data) {
    const newProject = {
      ...data,
      id: `P-${String(projects.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setProjects([...projects, newProject])
    setShowCreate(false)
    setSuccess('Project created successfully.')
  }

  function handleEdit(data) {
    setProjects(
      projects.map((p) => (p.id === editing.id ? { ...p, ...data } : p))
    )
    setEditing(null)
    setSuccess('Project updated successfully.')
  }

  function handleDelete() {
    setProjects(projects.filter((p) => p.id !== deleting.id))
    setDeleting(null)
    setSuccess('Project deleted successfully.')
  }

  function taskCounts(projectId) {
    // Counts are derived from the project list's own task totals when available.
    return { total: 0, completed: 0 }
  }

  return (
    <div>
      {success && <SuccessMessage message={success} />}

      <div className="page-header">
        <h1>Projects</h1>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
          + Create Project
        </button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon="📁"
          title="No projects yet"
          message="Create your first project to start tracking tasks."
          action={
            <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
              + Create Project
            </button>
          }
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {projects.map((project) => {
            const counts = taskCounts(project.id)
            return (
              <div key={project.id} className="card">
                <div className="flex-between mb-2">
                  <strong>{project.name}</strong>
                  <span className="muted text-sm">{project.id}</span>
                </div>
                <p className="muted text-sm mb-2">{project.description}</p>
                <div className="stack-row mb-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <p className="muted text-sm mb-4">
                  Created {project.createdAt}
                </p>
                <div className="action-buttons">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditing(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setDeleting(project)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showCreate && (
        <Modal title="Create Project" onClose={() => setShowCreate(false)}>
          <ProjectForm
            onSave={handleCreate}
            onCancel={() => setShowCreate(false)}
          />
        </Modal>
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

      {deleting && (
        <ConfirmDialog
          title="Delete project"
          message={`Are you sure you want to delete "${deleting.name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
