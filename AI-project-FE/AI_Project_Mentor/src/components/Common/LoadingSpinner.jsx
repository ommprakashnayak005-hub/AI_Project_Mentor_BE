// Small inline SVG spinner with a message.
export default function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="spinner-container" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  )
}
