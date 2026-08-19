// Centralised mock data for the AI Project Mentor frontend.
// Later this file can be removed when the real FastAPI backend is connected.

export const mockProjects = [
  {
    id: 'P-001',
    name: 'Student Placement Portal',
    description:
      'A portal where students can view placement drives, upload resumes, and track application status.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'Ollama'],
    createdAt: '2026-07-02',
  },
  {
    id: 'P-002',
    name: 'Hospital Appointment System',
    description:
      'A booking system for patients to schedule, reschedule and cancel appointments with doctors.',
    techStack: ['React', 'FastAPI', 'SQL Server'],
    createdAt: '2026-07-18',
  },
  {
    id: 'P-003',
    name: 'AI Resume Mentor',
    description:
      'An AI-powered resume analyser that reviews resumes and gives improvement suggestions.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'GPT-OSS'],
    createdAt: '2026-08-01',
  },
]

export const mockTasks = [
  {
    id: 'T-001',
    title: 'Design landing page',
    description: 'Create a responsive landing page with hero section and call to action.',
    projectId: 'P-001',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-03',
    updatedAt: '2026-07-06',
  },
  {
    id: 'T-002',
    title: 'Build student registration form',
    description: 'Form with validation for name, email, phone, course and graduation year.',
    projectId: 'P-001',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-20',
  },
  {
    id: 'T-003',
    title: 'Create resume upload feature',
    description: 'Allow students to upload PDF resumes up to 5MB.',
    projectId: 'P-001',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-08',
    updatedAt: '2026-07-08',
  },
  {
    id: 'T-004',
    title: 'Implement admin dashboard',
    description: 'Admin can view, approve and reject student applications.',
    projectId: 'P-001',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-07-10',
    updatedAt: '2026-07-10',
  },
  {
    id: 'T-005',
    title: 'Doctor availability calendar',
    description: 'Calendar view showing available slots for each doctor.',
    projectId: 'P-002',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-19',
    updatedAt: '2026-07-25',
  },
  {
    id: 'T-006',
    title: 'Patient login and signup',
    description: 'Email and password authentication with password reset flow.',
    projectId: 'P-002',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-20',
    updatedAt: '2026-08-02',
  },
  {
    id: 'T-007',
    title: 'Appointment booking API',
    description: 'REST endpoint to create, update and cancel appointments.',
    projectId: 'P-002',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-22',
    updatedAt: '2026-07-22',
  },
  {
    id: 'T-008',
    title: 'Resume parser service',
    description: 'Extract name, skills, experience and education from uploaded resumes.',
    projectId: 'P-003',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: true,
    createdAt: '2026-08-02',
    updatedAt: '2026-08-10',
  },
  {
    id: 'T-009',
    title: 'AI suggestion engine',
    description: 'Use GPT-OSS to generate resume improvement suggestions.',
    projectId: 'P-003',
    priority: 'High',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-08-04',
    updatedAt: '2026-08-04',
  },
  {
    id: 'T-010',
    title: 'Resume score dashboard',
    description: 'Visual dashboard showing resume score and improvement areas.',
    projectId: 'P-003',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-08-06',
    updatedAt: '2026-08-06',
  },
]

export const mockAIHistory = [
  {
    id: 'AI-001',
    projectId: 'P-001',
    projectName: 'Student Placement Portal',
    taskType: 'Break Requirement into Tasks',
    userPrompt:
      'I need to build a student placement portal with resume upload and application tracking.',
    responsePreview:
      'Breakdown: Frontend tasks include registration form, resume upload and dashboard. Backend tasks include auth APIs and application tracking endpoints...',
    modelName: 'GPT-OSS',
    createdAt: '2026-07-10',
    fullResponse: {
      requirementUnderstanding:
        'You want a portal where students upload resumes and track placement applications.',
      frontendTasks: [
        'Build student registration form',
        'Create resume upload component',
        'Build application tracking dashboard',
      ],
      backendTasks: [
        'Create student auth API',
        'Create resume upload endpoint',
        'Create application tracking CRUD API',
      ],
      databaseTasks: [
        'Students table',
        'Resumes table',
        'Applications table',
      ],
      testingSteps: [
        'Test registration validation',
        'Test resume upload size limit',
        'Test application status update flow',
      ],
      possibleBlockers: [
        'Resume parsing may need a third-party library',
        'File storage strategy must be decided early',
      ],
      recommendedNextAction:
        'Start with the student registration form and auth API, then add resume upload.',
    },
  },
  {
    id: 'AI-002',
    projectId: 'P-002',
    projectName: 'Hospital Appointment System',
    taskType: 'Identify Project Blockers',
    userPrompt:
      'What are the possible blockers in building a hospital appointment booking system?',
    responsePreview:
      'Blockers: doctor schedule conflicts, timezone handling for online appointments, and patient data privacy compliance...',
    modelName: 'GPT-OSS',
    createdAt: '2026-07-24',
    fullResponse: {
      requirementUnderstanding:
        'You want to identify risks and blockers in the hospital appointment system.',
      frontendTasks: [
        'Handle disabled time slots in the calendar',
        'Show booking confirmation feedback to the user',
      ],
      backendTasks: [
        'Add double-booking validation in the booking API',
        'Add timezone-aware datetime handling',
      ],
      databaseTasks: [
        'Doctors table with working hours',
        'Appointments table with unique slot constraint',
      ],
      testingSteps: [
        'Test overlapping appointment rejection',
        'Test cancellation and slot release',
      ],
      possibleBlockers: [
        'Doctor schedule conflicts',
        'Timezone handling for online appointments',
        'Patient data privacy compliance',
      ],
      recommendedNextAction:
        'Design the appointment slot model first to avoid double-booking issues later.',
    },
  },
  {
    id: 'AI-003',
    projectId: 'P-003',
    projectName: 'AI Resume Mentor',
    taskType: 'Generate Project Plan',
    userPrompt: 'Give me a full project plan for an AI resume mentor application.',
    responsePreview:
      'Plan: Phase 1 resume upload, Phase 2 parser integration, Phase 3 AI suggestions, Phase 4 scoring dashboard...',
    modelName: 'GPT-OSS',
    createdAt: '2026-08-05',
    fullResponse: {
      requirementUnderstanding:
        'You want a phased plan to build an AI resume mentor that analyses resumes and suggests improvements.',
      frontendTasks: [
        'Resume upload page',
        'Suggestion list view',
        'Resume score dashboard',
      ],
      backendTasks: [
        'Resume upload endpoint',
        'Parser service integration',
        'AI suggestion endpoint',
      ],
      databaseTasks: [
        'Users table',
        'Resumes table',
        'Suggestions table',
      ],
      testingSteps: [
        'Test parser with sample PDF resumes',
        'Test AI suggestion response shape',
        'Test dashboard score rendering',
      ],
      possibleBlockers: [
        'PDF parsing accuracy may vary',
        'AI model response latency',
      ],
      recommendedNextAction:
        'Start with the resume upload and parser service before connecting the AI model.',
    },
  },
  {
    id: 'AI-004',
    projectId: 'P-001',
    projectName: 'Student Placement Portal',
    taskType: 'Recommend Next Task',
    userPrompt: 'What should I work on next for the placement portal?',
    responsePreview:
      'Recommendation: complete the resume upload feature next because the application tracking depends on it...',
    modelName: 'GPT-OSS',
    createdAt: '2026-08-12',
    fullResponse: {
      requirementUnderstanding:
        'You want the next recommended task for the placement portal based on current progress.',
      frontendTasks: [
        'Finish resume upload component',
        'Add upload success and error feedback',
      ],
      backendTasks: [
        'Complete resume upload endpoint',
        'Add file size validation on the server',
      ],
      databaseTasks: [
        'Link resumes table to student records',
      ],
      testingSteps: [
        'Test upload with valid and invalid file sizes',
        'Test resume listing on the dashboard',
      ],
      possibleBlockers: [
        'File storage not yet decided',
        'Resume parser dependency',
      ],
      recommendedNextAction:
        'Complete the resume upload feature next because application tracking depends on it.',
    },
  },
]

// Helper: build a mock AI response for the AI Mentor page.
export function buildMockAIResponse(projectName, requirement, taskType) {
  return {
    requirementUnderstanding: `For the project "${projectName}", you asked to "${taskType.toLowerCase()}" based on the requirement: "${requirement}". The AI mentor has analysed the requirement and prepared a structured breakdown below.`,
    frontendTasks: [
      'Create the main UI layout and navigation',
      'Build forms with client-side validation',
      'Connect forms to the backend API',
      'Add loading and error states for API calls',
    ],
    backendTasks: [
      'Create REST endpoints for the required resource',
      'Add input validation on the server side',
      'Handle errors and return clear status codes',
      'Connect the endpoints to the database layer',
    ],
    databaseTasks: [
      'Design the required table schema',
      'Add foreign keys and relationships',
      'Create indexes for frequently queried columns',
    ],
    testingSteps: [
      'Write unit tests for the API endpoints',
      'Test form validation on the frontend',
      'Test the full create-read-update-delete flow',
      'Test error handling for invalid inputs',
    ],
    possibleBlockers: [
      'Unclear business rules may delay the API design',
      'Authentication may be needed before protected routes',
      'External library integration can introduce delays',
    ],
    recommendedNextAction:
      'Start by building the data model and the create endpoint, then build the frontend form that calls it.',
  }
}
