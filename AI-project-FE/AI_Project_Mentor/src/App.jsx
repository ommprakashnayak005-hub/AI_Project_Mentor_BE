import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { mockAIHistory, mockProjects, mockTasks } from './data/mockData'
import AIHistoryPage from './pages/AIHistoryPage'
import AIMentorPage from './pages/AIMentorPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import ProjectsPage from './pages/ProjectsPage'
import TasksPage from './pages/TasksPage'
import { getProjects } from './services/api'

// Root application component.
// Holds the shared mock-data state so that create/edit/delete operations
// performed in one page are reflected across all pages.
export default function App() {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState(mockTasks)
  const [history, setHistory] = useState(mockAIHistory)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getProjects().then(setProjects).catch(() => setProjects(mockProjects))
  }, [])

  return (
    <Layout onSearch={setSearch} searchValue={search}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route
          path="/projects"
          element={<ProjectsPage projects={projects} setProjects={setProjects} />}
        />
        <Route
          path="/projects/:id"
          element={
            <ProjectDetailsPage
              projects={projects}
              setProjects={setProjects}
              tasks={tasks}
              setTasks={setTasks}
            />
          }
        />
        <Route
          path="/tasks"
          element={<TasksPage projects={projects} tasks={tasks} setTasks={setTasks} />}
        />
        <Route
          path="/ai-mentor"
          element={
            <AIMentorPage projects={projects} tasks={tasks} setTasks={setTasks} />
          }
        />
        <Route
          path="/ai-history"
          element={<AIHistoryPage history={history} setHistory={setHistory} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
