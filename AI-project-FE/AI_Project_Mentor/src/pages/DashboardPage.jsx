import { useMemo } from 'react'
import StatCard from '../components/Dashboard/StatCard'
import ProjectProgressItem from '../components/Dashboard/ProjectProgressItem'
import RecentTasksTable from '../components/Dashboard/RecentTasksTable'
import RecommendedNextTask from '../components/Dashboard/RecommendedNextTask'
import EmptyState from '../components/Common/EmptyState'
import { mockProjects, mockTasks } from '../data/mockData'

// Dashboard page: summary stats, project progress, recent tasks and AI recommendation.
export default function DashboardPage() {
  // Derive dashboard statistics from the mock data.
  const stats = useMemo(() => {
    const totalProjects = mockProjects.length
    const totalTasks = mockTasks.length
    const pendingTasks = mockTasks.filter((t) => t.status === 'Pending').length
    const inProgressTasks = mockTasks.filter((t) => t.status === 'In Progress').length
    const completedTasks = mockTasks.filter((t) => t.status === 'Completed').length
    return { totalProjects, totalTasks, pendingTasks, inProgressTasks, completedTasks }
  }, [])

  // A simple mock recommendation for the dashboard.
  const recommendation = {
    projectName: 'Student Placement Portal',
    task: 'Complete the resume upload feature',
    reason:
      'Application tracking depends on uploaded resumes, so this unblocks the next two tasks.',
  }

  return (
    <div>
      {/* Summary cards */}
      <div className="stat-grid">
        <StatCard label="Total Projects" value={stats.totalProjects} icon="📁" tone="blue" />
        <StatCard label="Total Tasks" value={stats.totalTasks} icon="✓" tone="cyan" />
        <StatCard label="Pending Tasks" value={stats.pendingTasks} icon="⏳" tone="yellow" />
        <StatCard label="In Progress" value={stats.inProgressTasks} icon="⚙" tone="blue" />
        <StatCard label="Completed Tasks" value={stats.completedTasks} icon="✅" tone="green" />
      </div>

      {/* Project progress + recent tasks */}
      <div className="section-grid">
        <div>
          <h2 className="mb-4">Project Progress</h2>
          {mockProjects.map((project) => (
            <ProjectProgressItem
              key={project.id}
              project={project}
              tasks={mockTasks}
            />
          ))}
        </div>

        <div>
          <h2 className="mb-4">Recent Tasks</h2>
          {mockTasks.length === 0 ? (
            <EmptyState title="No tasks yet" message="Tasks will appear here once created." />
          ) : (
            <RecentTasksTable tasks={mockTasks} projects={mockProjects} />
          )}
        </div>
      </div>

      {/* AI recommendation */}
      <div className="mt-4">
        <RecommendedNextTask recommendation={recommendation} />
      </div>
    </div>
  )
}
