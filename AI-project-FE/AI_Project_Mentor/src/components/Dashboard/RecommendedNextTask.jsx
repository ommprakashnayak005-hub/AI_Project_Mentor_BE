import { useNavigate } from 'react-router-dom'

// "AI Recommended Next Task" card shown on the dashboard.
export default function RecommendedNextTask({ recommendation }) {
  const navigate = useNavigate()
  if (!recommendation) return null

  return (
    <div className="card">
      <h3 className="card-title">AI Recommended Next Task</h3>
      <p className="mb-2"><strong>Project:</strong> {recommendation.projectName}</p>
      <p className="mb-2"><strong>Recommended task:</strong> {recommendation.task}</p>
      <p className="muted text-sm mb-4"><strong>Reason:</strong> {recommendation.reason}</p>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => navigate('/ai-mentor')}
      >
        View Recommendation
      </button>
    </div>
  )
}
