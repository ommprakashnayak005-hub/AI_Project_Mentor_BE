from fastapi import Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import select, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Project, TASK, AIINTERACTION
from schemas import (
    AIInteractionResponse,
    AIPlanRequest,
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
)

from ollama_service import generate_ai_response, OllamaServiceError


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="AI Project Mentor API",
    description=(
        "FastAPI backend for managing projects, tasks and AI mentor "
        "interactions."
    ),
    version="1.0.0",
)


# =========================================================
# GENERAL
# =========================================================

@app.get("/", tags=["General"])
def root():
    return {
        "message": "Welcome to AI Project Mentor API",
        "documentation": "/docs",
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/api/health", tags=["Health"])
def health_check():

    try:
        with engine.connect() as connection:

            database_name = connection.execute(
                text("SELECT DB_NAME()")
            ).scalar()

        return {
            "status": "healthy",
            "backend": "connected",
            "database": "connected",
            "database_name": database_name,
        }

    except SQLAlchemyError as error:

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Backend is running, but SQL Server is unavailable.",
        ) from error


# =========================================================
# PROJECTS
# =========================================================

@app.post(
    "/api/projects",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Projects"],
)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
):

    project = Project(
        project_name=project_data.project_name,
        description=project_data.description,
        technology_stack=project_data.technology_stack,
    )

    try:

        db.add(project)
        db.commit()
        db.refresh(project)

        return project

    except SQLAlchemyError as error:

        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Project could not be created.",
        ) from error


# =========================================================
# GET ALL PROJECTS
# =========================================================

@app.get(
    "/api/projects",
    response_model=list[ProjectResponse],
    tags=["Projects"],
)
def get_projects(
    db: Session = Depends(get_db),
):

    try:

        projects = db.scalars(
            select(Project).order_by(Project.project_id)
        ).all()

        return projects

    except SQLAlchemyError as error:

        raise HTTPException(
            status_code=500,
            detail="Could not retrieve projects.",
        ) from error


# =========================================================
# GET SINGLE PROJECT
# =========================================================

@app.get(
    "/api/projects/{project_id}",
    response_model=ProjectResponse,
    tags=["Projects"],
)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
):

    project = db.get(Project, project_id)

    if project is None:

        raise HTTPException(
            status_code=404,
            detail=f"Project with ID {project_id} was not found.",
        )

    return project


# =========================================================
# UPDATE PROJECT
# =========================================================

@app.put(
    "/api/projects/{project_id}",
    response_model=ProjectResponse,
    tags=["Projects"],
)
def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    db: Session = Depends(get_db),
):

    project = db.get(Project, project_id)

    if project is None:

        raise HTTPException(
            status_code=404,
            detail=f"Project with ID {project_id} was not found.",
        )

    project.project_name = project_data.project_name
    project.description = project_data.description
    project.technology_stack = project_data.technology_stack

    try:

        db.commit()
        db.refresh(project)

        return project

    except SQLAlchemyError as error:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Project could not be updated.",
        ) from error


# =========================================================
# DELETE PROJECT
# =========================================================

@app.delete(
    "/api/projects/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Projects"],
)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
):

    project = db.get(Project, project_id)

    if project is None:

        raise HTTPException(
            status_code=404,
            detail=f"Project with ID {project_id} was not found.",
        )

    try:

        db.delete(project)
        db.commit()

        return Response(status_code=status.HTTP_204_NO_CONTENT)

    except SQLAlchemyError as error:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Project could not be deleted.",
        ) from error


# =========================================================
# AI MENTOR - GENERATE PLAN
# =========================================================

@app.post(
    "/api/ai/plan",
    response_model=AIInteractionResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["AI Mentor"],
)
def generate_project_plan(
    request_data: AIPlanRequest,
    db: Session = Depends(get_db),
):

    # -----------------------------------------------------
    # Find project
    # -----------------------------------------------------

    project = db.get(
        Project,
        request_data.project_id
    )

    if project is None:

        raise HTTPException(
            status_code=404,
            detail=f"Project with ID {request_data.project_id} was not found.",
        )

    # -----------------------------------------------------
    # Get existing tasks
    # -----------------------------------------------------

    try:

        existing_tasks = db.scalars(
            select(TASK)
            .where(
                TASK.project_id == request_data.project_id
            )
            .order_by(TASK.task_id)
        ).all()

    except SQLAlchemyError as error:

        raise HTTPException(
            status_code=500,
            detail="Could not retrieve existing tasks.",
        ) from error

    # -----------------------------------------------------
    # Generate AI response
    # -----------------------------------------------------

    try:

        ai_result = generate_ai_response(
            project_name=project.project_name,
            project_description=project.description,
            technology_stack=project.technology_stack,
            existing_tasks=existing_tasks,
            task_type=request_data.task_type,
            user_prompt=request_data.prompt,
        )

    except OllamaServiceError as error:

        raise HTTPException(
            status_code=502,
            detail=str(error),
        ) from error

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail="Unexpected error occurred while generating AI response.",
        ) from error

    # -----------------------------------------------------
    # Save AI interaction
    # -----------------------------------------------------

    interaction = AIINTERACTION(
        project_id=project.project_id,
        task_type=request_data.task_type,
        prompt=request_data.prompt,
        ai_response=ai_result["answer"],
        model_name=ai_result["model"],
    )

    try:

        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return interaction

    except SQLAlchemyError as error:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="The AI response was generated but could not be saved.",
        ) from error


# =========================================================
# AI HISTORY
# =========================================================

@app.get(
    "/api/ai/history/{project_id}",
    response_model=list[AIInteractionResponse],
    tags=["AI Mentor"],
)
def get_ai_history(
    project_id: int,
    db: Session = Depends(get_db),
):

    # -----------------------------------------------------
    # Check project
    # -----------------------------------------------------

    project = db.get(
        Project,
        project_id
    )

    if project is None:

        raise HTTPException(
            status_code=404,
            detail=f"Project with ID {project_id} was not found.",
        )

    # -----------------------------------------------------
    # Get AI history
    # -----------------------------------------------------

    try:

        history = db.scalars(
            select(AIINTERACTION)
            .where(
                AIINTERACTION.project_id == project_id
            )
            .order_by(
                AIINTERACTION.created_at.desc()
            )
        ).all()

        return history

    except SQLAlchemyError as error:

        raise HTTPException(
            status_code=500,
            detail="Could not retrieve AI history.",
        ) from error
