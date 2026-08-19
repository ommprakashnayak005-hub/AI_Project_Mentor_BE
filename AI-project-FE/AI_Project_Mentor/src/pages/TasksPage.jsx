import { useMemo, useState } from 'react'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import EmptyState from '../components/Common/EmptyState'
import TaskForm from '../components/Tasks/TaskForm'
import StatusBadge from '../components/Common/StatusBadge'
import PriorityBadge from '../components/Common/PriorityBadge'
import SuccessMessage from '../components/Common/SuccessMessage'

// Tasks page: table with filters, search, add / edit / change status / delete.
export default function TasksPage({ projects, tasks, setTasks }) {
  const [showCreate, setShowCreate] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [statusChanging, setStatusChanging] = useState(null)
  const [success, setSuccess] = useState('')

  // Filters
  const [filterProject, setFilterProject] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [search, setSearch] = useState('')

  const projectName = (projectId) =>
    projects.find((p) => p.id === projectId)?.name || 'Unknown'

  // Apply filters and search to the task list.
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filterProject && t.projectId !== filterProject) return false
      if (filterPriority && t.priority !== filterPriority) return false
      if (filterStatus && t.status !== filterStatus) return false
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [tasks, filterProject, filterPriority, filterStatus, search])

  function handleCreate(data) {
    const today = new Date().toISOString().slice(0, 10)
    const newTask = {
      ...data,
      id: `T-${String(tasks.length + 1).padStart(3, '0')}`,
      createdAt: today,
      updatedAt: today,
    }
    setTasks([...tasks, newTask])
    setShowCreate(false)
    setSuccess('Task created successfully.')
  }

  function handleEdit(data) {
    const today = new Date().toISOString().slice(0, 10)
    setTasks(
      tasks.map((t) =>
        t.id === editing.id ? { ...t, ...data, updatedAt: today } : t
      )
    )
    setEditing(null)
    setSuccess('Task updated successfully.')
  }

  function handleDelete() {
    setTasks(tasks.filter((t) => t.id !== deleting.id))
    setDeleting(null)
    setSuccess('Task deleted successfully.')
  }

  function handleChangeStatus(newStatus) {
    const today = new Date().toISOString().slice(0, 10)
    setTasks(
      tasks.map((t) =>
        t.id === statusChanging.id ? { ...t, status: newStatus, updatedAt: today } : t
      )
    )
    setStatusChanging(null)
    setSuccess('Task status updated successfully.')
  }

  return (
    <div>
      {success && <SuccessMessage message={success} />}

      <div className="page-header">
        <h1>Tasks</h1>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
          + Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="form-group">
          <label className="form-label" htmlFor="filter-project">Project</label>
          <select
            id="filter-project"
            className="form-select"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="filter-priority">Priority</label>
          <select
            id="filter-priority"
            className="form-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="filter-status">Status</label>
          <select
            id="filter-status"
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All statuses</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="filter-search">Search title</label>
          <input
            id="filter-search"
            className="form-input"
            placeholder="Search tasks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          icon="✓"
          title="No tasks found"
          message="Try adjusting your filters or add a new task."
        />
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Project</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>AI</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className="muted text-sm">{task.id}</td>
                  <td>{task.title}</td>
                  <td>{projectName(task.projectId)}</td>
                  <td className="text-sm">{task.description}</td>
                  <td><PriorityBadge priority={task.priority} /></td>
                  <td><StatusBadge status={task.status} /></td>
                  <td>{task.aiGenerated ? <span className="badge badge-cyan">AI</span> : '—'}</td>
                  <td className="muted text-sm">{task.createdAt}</td>
                  <td className="muted text-sm">{task.updatedAt}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditing(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setStatusChanging(task)}
                      >
                        Status
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleting(task)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreate && (
        <Modal title="Add Task" onClose={() => setShowCreate(false)}>
          <TaskForm
            projects={projects}
            onSave={handleCreate}
            onCancel={() => setShowCreate(false)}
          />
        </Modal>
      )}

      {editing && (
        <Modal title="Edit Task" onClose={() => setEditing(null)}>
          <TaskForm
            initialData={editing}
            projects={projects}
            onSave={handleEdit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete task"
          message={`Are you sure you want to delete "${deleting.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}

      {statusChanging && (
        <Modal
          title="Change Status"
          onClose={() => setStatusChanging(null)}
          footer={
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setStatusChanging(null)}
              >
                Cancel
              </button>
            </>
          }
        >
          <p className="mb-4">Choose a new status for "{statusChanging.title}":</p>
          <div className="action-buttons">
            {['Pending', 'In Progress', 'Completed'].map((s) => (
              <button
                key={s}
                className="btn btn-primary btn-sm"
                onClick={() => handleChangeStatus(s)}
                disabled={s === statusChanging.status}
              >
                {s}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}
