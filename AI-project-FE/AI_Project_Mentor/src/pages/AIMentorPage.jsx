import { useState } from 'react'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import ErrorMessage from '../components/Common/ErrorMessage'
import SuccessMessage from '../components/Common/SuccessMessage'
import { generateAIPlan } from '../services/api'

const AI_TASK_TYPES = [
  'Generate Project Plan',
  'Break Requirement into Tasks',
  'Recommend Next Task',
  'Identify Project Blockers',
  'Explain Implementation',
  'Generate Testing Checklist',
]

// AI Mentor page: select a project, enter a requirement, get a mock AI response.
export default function AIMentorPage({ projects, tasks, setTasks }) {
  const [projectId, setProjectId] = useState('')
  const [requirement, setRequirement] = useState('')
  const [taskType, setTaskType] = useState(AI_TASK_TYPES[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [response, setResponse] = useState(null)
  const [saved, setSaved] = useState(false)

  const project = projects.find((p) => p.id === projectId)

  async function handleGenerate(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setResponse(null)
    setSaved(false)

    if (!projectId) {
      setError('Please select a project.')
      return
    }
    if (!requirement.trim()) {
      setError('Please enter a requirement or question.')
      return
    }

    setLoading(true)
    try {
      // Calls the mock generator; later this will hit POST /api/ai/plan.
      const data = await generateAIPlan({
        projectName: project.name,
        requirement: requirement.trim(),
        taskType,
      })
      setResponse(data)
    } catch (err) {
      setError('AI Mentor is temporarily unavailable. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSave() {
    setSuccess('Recommendation saved to AI History.')
    setSaved(true)
  }

  function handleCreateTasks() {
    if (!response) return
    const today = new Date().toISOString().slice(0, 10)
    const newTasks = [...response.frontendTasks, ...response.backendTasks].map(
      (title, index) => ({
        id: `T-${String(tasks.length + index + 1).padStart(3, '0')}`,
        title,
        description: 'Created from AI recommendation.',
        projectId,
        priority: 'Medium',
        status: 'Pending',
        aiGenerated: true,
        createdAt: today,
        updatedAt: today,
      })
    )
    setTasks([...tasks, ...newTasks])
    setSuccess(`Created ${newTasks.length} tasks from the recommendation.`)
  }

  function handleClear() {
    setResponse(null)
    setRequirement('')
    setSuccess('')
    setSaved(false)
  }

  return (
    <div>
      <div className="page-header">
        <h1>AI Mentor</h1>
      </div>

      <div className="card mb-4">
        <form onSubmit={handleGenerate}>
          <div className="form-group">
            <label className="form-label" htmlFor="ai-project">Select Project</label>
            <select
              id="ai-project"
              className="form-select"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">— Select a project —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ai-requirement">
              Requirement or Question
            </label>
            <textarea
              id="ai-requirement"
              className="form-textarea"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              placeholder="Describe the feature you want to build…"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ai-task-type">AI Task Type</label>
            <select
              id="ai-task-type"
              className="form-select"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              {AI_TASK_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="action-buttons">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Generate AI Recommendation
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              Clear Response
            </button>
          </div>
        </form>
      </div>

      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}

      {loading && <LoadingSpinner message="AI Mentor is analysing your project…" />}

      {response && !loading && (
        <div className="card">
          <h3 className="card-title">AI Recommendation</h3>

          <div className="ai-response-section">
            <h4>Requirement Understanding</h4>
            <p>{response.requirementUnderstanding}</p>
          </div>

          <div className="ai-response-section">
            <h4>Frontend Tasks</h4>
            <ul>
              {response.frontendTasks.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <div className="ai-response-section">
            <h4>Backend Tasks</h4>
            <ul>
              {response.backendTasks.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <div className="ai-response-section">
            <h4>Database Tasks</h4>
            <ul>
              {response.databaseTasks.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <div className="ai-response-section">
            <h4>Testing Steps</h4>
            <ul>
              {response.testingSteps.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <div className="ai-response-section">
            <h4>Possible Blockers</h4>
            <ul>
              {response.possibleBlockers.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <div className="ai-response-section">
            <h4>Recommended Next Action</h4>
            <p>{response.recommendedNextAction}</p>
          </div>

          <div className="action-buttons">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSave}
              disabled={saved}
            >
              {saved ? 'Saved' : 'Save Recommendation'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleCreateTasks}>
              Create Tasks from Recommendation
            </button>
            <button className="btn btn-ghost btn-sm" onClick={handleClear}>
              Clear Response
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
