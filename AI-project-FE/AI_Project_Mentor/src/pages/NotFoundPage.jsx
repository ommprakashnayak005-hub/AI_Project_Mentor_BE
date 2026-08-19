import { Link } from 'react-router-dom'
import EmptyState from '../components/Common/EmptyState'

// 404 page shown for unknown routes.
export default function NotFoundPage() {
  return (
    <EmptyState
      icon="🧭"
      title="Page not found"
      message="The page you are looking for does not exist."
      action={
        <Link className="btn btn-primary" to="/">Back to Dashboard</Link>
      }
    />
  )
}
