import { useState } from 'react'

// Reusable form used for both creating and editing a project.
// `initialData` is optional; when provided the form acts as an edit form.
export default function ProjectForm({ initialData, onSave, onCancel }) {
  const [name, setName] = useState(initialData?.name || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [techStack, setTechStack] = useState(
    Array.isArray(initialData?.techStack)
      ? initialData.techStack.join(', ')
      : initialData?.techStack || ''
  )
  const [errors, setErrors] = useState({})

  // Basic required-field validation.
  function validate() {
    const next = {}
    if (!name.trim()) next.name = 'Project name is required.'
    if (!description.trim()) next.description = 'Description is required.'
    if (!techStack.trim()) next.techStack = 'Technology stack is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSave({
      name: name.trim(),
      description: description.trim(),
      techStack: techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="project-name">Project Name</label>
        <input
          id="project-name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="project-description">
          Project Description
        </label>
        <textarea
          id="project-description"
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-invalid={!!errors.description}
        />
        {errors.description && <div className="form-error">{errors.description}</div>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="project-stack">
          Technology Stack <span className="muted">(comma separated)</span>
        </label>
        <input
          id="project-stack"
          className="form-input"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="React, FastAPI, SQL Server"
          aria-invalid={!!errors.techStack}
        />
        {errors.techStack && <div className="form-error">{errors.techStack}</div>}
      </div>

      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">Save Project</button>
      </div>
    </form>
  )
}
