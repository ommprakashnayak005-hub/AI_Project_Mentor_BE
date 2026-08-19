import { useMemo, useState } from 'react'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import EmptyState from '../components/Common/EmptyState'
import SuccessMessage from '../components/Common/SuccessMessage'

// AI History page: list of previous AI interactions with view / delete actions.
export default function AIHistoryPage({ history, setHistory }) {
  const [viewing, setViewing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [success, setSuccess] = useState('')

  // Filters
  const [filterProject, setFilterProject] = useState('')
  const [filterTaskType, setFilterTaskType] = useState('')
  const [filterDate, setFilterDate] = useState('')

  const filtered = useMemo(() => {
    return history.filter((h) => {
      if (filterProject && h.projectId !== filterProject) return false
      if (filterTaskType && h.taskType !== filterTaskType) return false
      if (filterDate && h.createdAt !== filterDate) return false
      return true
    })
  }, [history, filterProject, filterTaskType, filterDate])

  // Unique task types for the filter dropdown.
  const taskTypes = [...new Set(history.map((h) => h.taskType))]

  function handleDelete() {
    setHistory(history.filter((h) => h.id !== deleting.id))
    setDeleting(null)
    setSuccess('History entry deleted successfully.')
  }

  return (
    <div>
      {success && <SuccessMessage message={success} />}

      <div className="page-header">
        <h1>AI History</h1>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="form-group">
          <label className="form-label" htmlFor="hist-project">Project</label>
          <select
            id="hist-project"
            className="form-select"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="">All projects</option>
            {[...new Map(history.map((h) => [h.projectId, h])).values()].map((h) => (
              <option key={h.projectId} value={h.projectId}>{h.projectName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="hist-tasktype">AI Task Type</label>
          <select
            id="hist-tasktype"
            className="form-select"
            value={filterTaskType}
            onChange={(e) => setFilterTaskType(e.target.value)}
          >
            <option value="">All task types</option>
            {taskTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="hist-date">Date</label>
          <input
            id="hist-date"
            type="date"
            className="form-input"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="🕘"
          title="No AI interactions found"
          message="Try adjusting your filters or generate a new recommendation from the AI Mentor page."
        />
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project</th>
                <th>Prompt</th>
                <th>Response Preview</th>
                <th>Task Type</th>
                <th>Model</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => (
                <tr key={h.id}>
                  <td className="muted text-sm">{h.id}</td>
                  <td>{h.projectName}</td>
                  <td className="text-sm">{h.userPrompt}</td>
                  <td className="text-sm muted">{h.responsePreview}</td>
                  <td><span className="badge badge-cyan">{h.taskType}</span></td>
                  <td><span className="badge badge-blue">{h.modelName}</span></td>
                  <td className="muted text-sm">{h.createdAt}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setViewing(h)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleting(h)}
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

      {viewing && (
        <Modal
          title={`Interaction ${viewing.id}`}
          onClose={() => setViewing(null)}
        >
          <p className="mb-2"><strong>Project:</strong> {viewing.projectName}</p>
          <p className="mb-2"><strong>Task Type:</strong> {viewing.taskType}</p>
          <p className="mb-2"><strong>Model:</strong> {viewing.modelName}</p>
          <p className="mb-2"><strong>Created:</strong> {viewing.createdAt}</p>
          <p className="mb-2"><strong>Prompt:</strong> {viewing.userPrompt}</p>

          <h4 className="mt-4 mb-2">Requirement Understanding</h4>
          <p className="muted">{viewing.fullResponse.requirementUnderstanding}</p>

          <h4 className="mt-4 mb-2">Frontend Tasks</h4>
          <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
            {viewing.fullResponse.frontendTasks.map((t, i) => <li key={i}>{t}</li>)}
          </ul>

          <h4 className="mt-4 mb-2">Backend Tasks</h4>
          <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
            {viewing.fullResponse.backendTasks.map((t, i) => <li key={i}>{t}</li>)}
          </ul>

          <h4 className="mt-4 mb-2">Database Tasks</h4>
          <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
            {viewing.fullResponse.databaseTasks.map((t, i) => <li key={i}>{t}</li>)}
          </ul>

          <h4 className="mt-4 mb-2">Testing Steps</h4>
          <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
            {viewing.fullResponse.testingSteps.map((t, i) => <li key={i}>{t}</li>)}
          </ul>

          <h4 className="mt-4 mb-2">Possible Blockers</h4>
          <ul style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
            {viewing.fullResponse.possibleBlockers.map((t, i) => <li key={i}>{t}</li>)}
          </ul>

          <h4 className="mt-4 mb-2">Recommended Next Action</h4>
          <p className="muted">{viewing.fullResponse.recommendedNextAction}</p>
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete history entry"
          message={`Are you sure you want to delete interaction "${deleting.id}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
