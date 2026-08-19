import { NavLink } from 'react-router-dom'

// Sidebar navigation with links to every main page.
const navItems = [
  { to: '/', label: 'Dashboard', icon: '▦' },
  { to: '/projects', label: 'Projects', icon: '📁' },
  { to: '/tasks', label: 'Tasks', icon: '✓' },
  { to: '/ai-mentor', label: 'AI Mentor', icon: '🤖' },
  { to: '/ai-history', label: 'AI History', icon: '🕘' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon" aria-hidden="true">🎓</div>
          <div className="sidebar-brand-name">AI Project Mentor</div>
        </div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          Frontend demo · mock data
          <br />
          v1.0
        </div>
      </aside>
    </>
  )
}
