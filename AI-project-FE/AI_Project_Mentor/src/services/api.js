import axios from 'axios'
import {
  buildMockAIResponse,
  mockAIHistory,
  mockProjects,
  mockTasks,
} from '../data/mockData'

// Base URL for the future FastAPI backend.
// Read from the Vite environment variable, with a safe local default.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

// Switch between mock data and real API calls. Mock data is opt-in.
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'

// Pre-configured axios instance for the future backend.
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Small helper to simulate network latency for mock responses.
function mockDelay(data, ms = 400) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------
export async function checkBackendHealth() {
  if (USE_MOCK_DATA) return mockDelay({ status: 'mock', message: 'Using mock data' })
  const response = await apiClient.get('/api/health')
  return response.data
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------
export async function getDashboardStatistics() {
  if (USE_MOCK_DATA) {
    const totalProjects = mockProjects.length
    const totalTasks = mockTasks.length
    const pendingTasks = mockTasks.filter((t) => t.status === 'Pending').length
    const inProgressTasks = mockTasks.filter(
      (t) => t.status === 'In Progress'
    ).length
    const completedTasks = mockTasks.filter((t) => t.status === 'Completed').length
    return mockDelay({
      totalProjects,
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
    })
  }
  const response = await apiClient.get('/api/dashboard')
  return response.data
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export async function getProjects() {
  if (USE_MOCK_DATA) return mockDelay(mockProjects)
  const response = await apiClient.get('/api/projects')
  return response.data.map(toFrontendProject)
}

export async function getProjectById(projectId) {
  if (USE_MOCK_DATA) {
    const project = mockProjects.find((p) => p.id === projectId)
    return mockDelay(project)
  }
  const response = await apiClient.get(`/api/projects/${projectId}`)
  return toFrontendProject(response.data)
}

export async function createProject(projectData) {
  if (USE_MOCK_DATA) return mockDelay(projectData)
  const response = await apiClient.post('/api/projects', toBackendProject(projectData))
  return toFrontendProject(response.data)
}

export async function updateProject(projectId, projectData) {
  if (USE_MOCK_DATA) return mockDelay({ ...projectData, id: projectId })
  const response = await apiClient.put(
    `/api/projects/${projectId}`,
    toBackendProject(projectData)
  )
  return toFrontendProject(response.data)
}

export async function deleteProject(projectId) {
  if (USE_MOCK_DATA) return mockDelay({ success: true, id: projectId })
  const response = await apiClient.delete(`/api/projects/${projectId}`)
  return response.data
}

function toBackendProject(project) {
  return {
    project_name: project.name,
    description: project.description,
    technology_stack: Array.isArray(project.techStack)
      ? project.techStack.join(', ')
      : project.techStack,
  }
}

function toFrontendProject(project) {
  return {
    id: project.project_id,
    name: project.project_name,
    description: project.description,
    techStack: project.technology_stack
      .split(',')
      .map((technology) => technology.trim())
      .filter(Boolean),
    createdAt: project.created_at.slice(0, 10),
  }
}

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------
export async function getTasks() {
  if (USE_MOCK_DATA) return mockDelay(mockTasks)
  const response = await apiClient.get('/api/tasks')
  return response.data
}

export async function createTask(taskData) {
  if (USE_MOCK_DATA) return mockDelay(taskData)
  const response = await apiClient.post('/api/tasks', taskData)
  return response.data
}

export async function updateTask(taskId, taskData) {
  if (USE_MOCK_DATA) return mockDelay({ ...taskData, id: taskId })
  const response = await apiClient.put(`/api/tasks/${taskId}`, taskData)
  return response.data
}

export async function updateTaskStatus(taskId, status) {
  if (USE_MOCK_DATA) return mockDelay({ id: taskId, status })
  const response = await apiClient.patch(`/api/tasks/${taskId}/status`, { status })
  return response.data
}

export async function deleteTask(taskId) {
  if (USE_MOCK_DATA) return mockDelay({ success: true, id: taskId })
  const response = await apiClient.delete(`/api/tasks/${taskId}`)
  return response.data
}

// ---------------------------------------------------------------------------
// AI
// ---------------------------------------------------------------------------
export async function generateAIPlan(requestData) {
  if (USE_MOCK_DATA) {
    const { projectName, requirement, taskType } = requestData
    const response = buildMockAIResponse(projectName, requirement, taskType)
    return mockDelay(response, 1200)
  }
  const response = await apiClient.post('/api/ai/plan', requestData)
  return response.data
}

export async function getAIHistory(projectId) {
  if (USE_MOCK_DATA) {
    const history = projectId
      ? mockAIHistory.filter((h) => h.projectId === projectId)
      : mockAIHistory
    return mockDelay(history)
  }
  const response = await apiClient.get(`/api/ai/history/${projectId}`)
  return response.data
}

export { BASE_URL, USE_MOCK_DATA }

