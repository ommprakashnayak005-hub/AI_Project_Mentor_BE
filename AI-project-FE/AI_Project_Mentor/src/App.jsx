import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import TasksPage from './pages/TasksPage'
import AIMentorPage from './pages/AIMentorPage'
import AIHistoryPage from './pages/AIHistoryPage'
import NotFoundPage from './pages/NotFoundPage'
import { mockProjects, mockTasks, mockAIHistory } from './data/mockData'

// Root application component.
// Holds the shared mock-data state so that create/edit/delete operations
// performed in one page are reflected across all pages.
export default function App() {
  const [projects, setProjects] = useState(mockProjects)
  const [tasks, setTasks] = useState(mockTasks)
  const [history, setHistory] = useState(mockAIHistory)
  const [search, setSearch] = useState('')

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
