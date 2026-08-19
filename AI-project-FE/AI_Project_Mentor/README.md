# AI Project Mentor

A beginner-friendly full-stack training application where users can manage
software projects, track development tasks, and ask an AI mentor to break
requirements into actionable tasks.

## Application objective

AI Project Mentor helps learners practise full-stack development by:

- Creating and managing software projects.
- Adding development tasks to a project.
- Updating task priorities and statuses.
- Viewing project progress through a dashboard.
- Asking an AI mentor to break requirements into development tasks.
- Viewing previous AI interactions.

This repository currently contains **only the frontend**. It runs entirely on
mock data and does not require a backend or database.

## Technology stack

- **HTML5** – page structure
- **CSS3** – design, layout and responsiveness
- **JavaScript ES6+** – application logic
- **React.js** – reusable UI components
- **Vite** – React build tool
- **React Router DOM** – navigation
- **Axios** – prepared for future backend API communication

## Current frontend features

- Responsive sidebar with collapsible mobile navigation
- Clean top header with search and profile placeholder
- Dashboard with summary cards, project progress, recent tasks and AI recommendation
- Projects page with create, edit and delete (with confirmation dialog)
- Project details page with task list
- Tasks page with filters, search, status change and delete
- AI Mentor page with mock structured response
- AI History page with filters and full response viewer
- Reusable UI components: LoadingSpinner, ErrorMessage, SuccessMessage,
  EmptyState, ConfirmDialog, Modal, StatusBadge, PriorityBadge
- Form validation with inline error messages
- Runs with mock data — no backend required

## Planned backend technologies

- **Python** – backend language
- **FastAPI** – REST API framework
- **SQL Server** – database
- **Ollama Cloud API** – GPT-OSS model for AI mentor features

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Folder structure

```
src/
  components/
    Layout/      Sidebar, Header, Layout shell
    Dashboard/   StatCard, ProjectProgressItem, RecentTasksTable, RecommendedNextTask
    Projects/    ProjectForm
    Tasks/       TaskForm
    AI/          (reserved for future AI components)
    Common/      LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState,
                 ConfirmDialog, Modal, StatusBadge, PriorityBadge
  pages/
    DashboardPage.jsx
    ProjectsPage.jsx
    ProjectDetailsPage.jsx
    TasksPage.jsx
    AIMentorPage.jsx
    AIHistoryPage.jsx
    NotFoundPage.jsx
  services/
    api.js        Axios service with mock-data switch
  data/
    mockData.js   Centralised mock data for projects, tasks and AI history
  styles/
    global.css    Theme, layout and component styles
  App.jsx         Root component with routes
  main.jsx        Entry point
```

## Environment variables

Copy `.env.example` to `.env` and adjust if needed:

| Variable | Description | Default |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Base URL of the future FastAPI backend | `http://127.0.0.1:8000` |
| `VITE_USE_MOCK_DATA` | `true` to use mock data, `false` to call the real backend | `true` |

No AI API keys, database credentials or connection strings are stored in the
frontend. Those values belong only in the future Python backend.

## Future FastAPI integration plan

The frontend is prepared to consume these endpoints once the backend is built:

```
GET    /api/health
GET    /api/dashboard

GET    /api/projects
POST   /api/projects
GET    /api/projects/{project_id}
PUT    /api/projects/{project_id}
DELETE /api/projects/{project_id}

GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{task_id}
PUT    /api/tasks/{task_id}
PATCH  /api/tasks/{task_id}/status
DELETE /api/tasks/{task_id}

POST   /api/ai/plan
POST   /api/ai/next-task
GET    /api/ai/history/{project_id}
```

To switch from mock data to the real backend:

1. Start the FastAPI server.
2. Set `VITE_USE_MOCK_DATA=false` in `.env`.
3. Set `VITE_API_BASE_URL` to the backend URL if different from the default.

The reusable Axios service in `src/services/api.js` already maps every
frontend action to the corresponding endpoint and will be used automatically
once mock data is disabled.
