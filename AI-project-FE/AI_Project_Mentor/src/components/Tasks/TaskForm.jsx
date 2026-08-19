import { useState } from 'react'

// Reusable form for creating and editing tasks.
export default function TaskForm({ initialData, projects, onSave, onCancel }) {
  const [projectId, setProjectId] = useState(initialData?.projectId || '')
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [priority, setPriority] = useState(initialData?.priority || 'Medium')
  const [status, setStatus] = useState(initialData?.status || 'Pending')
  const [aiGenerated, setAiGenerated] = useState(initialData?.aiGenerated || false)
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    if (!projectId) next.projectId = 'Please select a project.'
    if (!title.trim()) next.title = 'Task title is required.'
    if (!description.trim()) next.description = 'Task description is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSave({
      projectId,
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      aiGenerated,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="task-project">Select Project</label>
        <select
          id="task-project"
          className="form-select"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          aria-invalid={!!errors.projectId}
        >
          <option value="">— Select a project —</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.projectId && <div className="form-error">{errors.projectId}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="task-title">Task Title</label>
        <input
          id="task-title"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
        />
        {errors.title && <div className="form-error">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="task-description">Task Description</label>
        <textarea
          id="task-description"
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-invalid={!!errors.description}
        />
        {errors.description && <div className="form-error">{errors.description}</div>}
      </div>

      <div className="section-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-status">Status</label>
          <select
            id="task-status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <div className="form-checkbox-row">
          <input
            id="task-ai"
            type="checkbox"
            className="form-checkbox"
            checked={aiGenerated}
            onChange={(e) => setAiGenerated(e.target.checked)}
          />
          <label htmlFor="task-ai" className="form-label" style={{ marginBottom: 0 }}>
            AI Generated
          </label>
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">Save Task</button>
      </div>
    </form>
  )
}
