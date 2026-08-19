import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

// Maps the current route to a human-readable page title shown in the header.
const PAGE_TITLES = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/ai-mentor': 'AI Mentor',
  '/ai-history': 'AI History',
}

// Shared application layout: sidebar + header + page content.
export default function Layout({ children, onSearch, searchValue }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Resolve the header title from the current path.
  const base = location.pathname.split('/')[1]
  const title =
    PAGE_TITLES[location.pathname] ||
    PAGE_TITLES[`/${base}`] ||
    (location.pathname.startsWith('/projects/') ? 'Project Details' : 'Page')

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
          onSearch={onSearch}
          searchValue={searchValue}
        />
        <main className="app-content">{children}</main>
      </div>
    </div>
  )
}
