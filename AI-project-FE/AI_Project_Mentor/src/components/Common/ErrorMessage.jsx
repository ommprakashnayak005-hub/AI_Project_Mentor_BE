// Reusable error message banner.
export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div className="message-box message-error" role="alert">
      <span aria-hidden="true">⚠</span>
      <span>{message}</span>
    </div>
  )
}
