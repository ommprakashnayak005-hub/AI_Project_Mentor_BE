// Reusable success message banner.
export default function SuccessMessage({ message }) {
  if (!message) return null
  return (
    <div className="message-box message-success" role="status">
      <span aria-hidden="true">✓</span>
      <span>{message}</span>
    </div>
  )
}
