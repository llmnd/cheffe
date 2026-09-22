from typing import Annotated

from fastapi import Depends, FastAPI, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import create_db_and_tables, get_db
from app.models import Collaboration, Creation, GalleryItem, JournalPost, Project, Recipe
from app.schemas import (
    CollaborationCreate,
    ContactMessage,
    CreationCreate,
    GalleryItemCreate,
    JournalPostCreate,
    MessageResponse,
    ProjectCreate,
    RecipeCreate,
)
from app.seed import seed_demo_data

app = FastAPI(title="Cheffe Khadidiatou API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event() -> None:
    create_db_and_tables()
    seed_demo_data()


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "service": "cheffe-api"}


def require_admin_api_key(x_api_key: Annotated[str | None, Header()] = None) -> None:
    if not x_api_key or x_api_key != "cheffe-admin-dev":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key",
        )


@app.get("/api/recipes")
def list_recipes(db: Session = Depends(get_db)) -> list[dict]:
    recipes = db.query(Recipe).order_by(Recipe.created_at.desc()).all()
    return [{
        "id": recipe.id,
        "title": recipe.title,
        "slug": recipe.slug,
        "excerpt": recipe.excerpt,
        "content": recipe.content,
        "cover_image": recipe.cover_image,
        "preparation_time": recipe.preparation_time,
        "cooking_time": recipe.cooking_time,
        "difficulty": recipe.difficulty,
        "ingredients": recipe.ingredients,
        "steps": recipe.steps,
        "tips": recipe.tips,
        "published": recipe.published,
        "meta_title": recipe.meta_title,
        "meta_description": recipe.meta_description,
        "og_image": recipe.og_image,
        "created_at": recipe.created_at,
        "updated_at": recipe.updated_at,
    } for recipe in recipes]


@app.get("/api/recipes/{slug}")
def get_recipe(slug: str, db: Session = Depends(get_db)) -> dict:
    recipe = db.query(Recipe).filter(Recipe.slug == slug).first()
    if not recipe:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe not found")
    return {
        "id": recipe.id,
        "title": recipe.title,
        "slug": recipe.slug,
        "excerpt": recipe.excerpt,
        "content": recipe.content,
        "cover_image": recipe.cover_image,
        "preparation_time": recipe.preparation_time,
        "cooking_time": recipe.cooking_time,
        "difficulty": recipe.difficulty,
        "ingredients": recipe.ingredients,
        "steps": recipe.steps,
        "tips": recipe.tips,
        "published": recipe.published,
        "meta_title": recipe.meta_title,
        "meta_description": recipe.meta_description,
        "og_image": recipe.og_image,
        "created_at": recipe.created_at,
        "updated_at": recipe.updated_at,
    }


@app.post("/api/recipes", status_code=status.HTTP_201_CREATED)
def create_recipe(payload: RecipeCreate, db: Session = Depends(get_db), _: None = Depends(require_admin_api_key)) -> dict:
    recipe = Recipe(**payload.model_dump())
    db.add(recipe)
    db.commit()
    db.refresh(recipe)
    return {"status": "success", "recipe_id": recipe.id}


@app.get("/api/creations")
def list_creations(db: Session = Depends(get_db)) -> list[dict]:
    creations = db.query(Creation).order_by(Creation.created_at.desc()).all()
    return [{
        "id": creation.id,
        "title": creation.title,
        "slug": creation.slug,
        "description": creation.description,
        "image": creation.image,
        "category": creation.category,
        "meta_title": creation.meta_title,
        "meta_description": creation.meta_description,
        "og_image": creation.og_image,
        "created_at": creation.created_at,
    } for creation in creations]


@app.get("/api/creations/{slug}")
def get_creation(slug: str, db: Session = Depends(get_db)) -> dict:
    creation = db.query(Creation).filter(Creation.slug == slug).first()
    if not creation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Creation not found")
    return {
        "id": creation.id,
        "title": creation.title,
        "slug": creation.slug,
        "description": creation.description,
        "image": creation.image,
        "category": creation.category,
        "meta_title": creation.meta_title,
        "meta_description": creation.meta_description,
        "og_image": creation.og_image,
        "created_at": creation.created_at,
    }


@app.post("/api/creations", status_code=status.HTTP_201_CREATED)
def create_creation(payload: CreationCreate, db: Session = Depends(get_db), _: None = Depends(require_admin_api_key)) -> dict:
    creation = Creation(**payload.model_dump())
    db.add(creation)
    db.commit()
    db.refresh(creation)
    return {"status": "success", "creation_id": creation.id}


@app.get("/api/journal")
def list_journal_posts(db: Session = Depends(get_db)) -> list[dict]:
    posts = db.query(JournalPost).order_by(JournalPost.created_at.desc()).all()
    return [{
        "id": post.id,
        "title": post.title,
        "slug": post.slug,
        "excerpt": post.excerpt,
        "content": post.content,
        "cover_image": post.cover_image,
        "published": post.published,
        "meta_title": post.meta_title,
        "meta_description": post.meta_description,
        "og_image": post.og_image,
        "created_at": post.created_at,
        "updated_at": post.updated_at,
    } for post in posts]


@app.get("/api/journal/{slug}")
def get_journal_post(slug: str, db: Session = Depends(get_db)) -> dict:
    post = db.query(JournalPost).filter(JournalPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journal post not found")
    return {
        "id": post.id,
        "title": post.title,
        "slug": post.slug,
        "excerpt": post.excerpt,
        "content": post.content,
        "cover_image": post.cover_image,
        "published": post.published,
        "meta_title": post.meta_title,
        "meta_description": post.meta_description,
        "og_image": post.og_image,
        "created_at": post.created_at,
        "updated_at": post.updated_at,
    }


@app.post("/api/journal", status_code=status.HTTP_201_CREATED)
def create_journal_post(payload: JournalPostCreate, db: Session = Depends(get_db), _: None = Depends(require_admin_api_key)) -> dict:
    post = JournalPost(**payload.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return {"status": "success", "post_id": post.id}


@app.get("/api/gallery")
def list_gallery(db: Session = Depends(get_db)) -> list[dict]:
    items = db.query(GalleryItem).order_by(GalleryItem.created_at.desc()).all()
    return [{
        "id": item.id,
        "type": item.type,
        "image_url": item.image_url,
        "video_url": item.video_url,
        "caption": item.caption,
        "category": item.category,
        "created_at": item.created_at,
    } for item in items]


@app.post("/api/gallery", status_code=status.HTTP_201_CREATED)
def create_gallery_item(payload: GalleryItemCreate, db: Session = Depends(get_db), _: None = Depends(require_admin_api_key)) -> dict:
    item = GalleryItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"status": "success", "gallery_item_id": item.id}


@app.get("/api/projects")
def list_projects(db: Session = Depends(get_db)) -> list[dict]:
    projects = db.query(Project).order_by(Project.created_at.desc()).all()
    return [{
        "id": project.id,
        "title": project.title,
        "slug": project.slug,
        "description": project.description,
        "date": project.date,
        "location": project.location,
        "images": project.images,
        "category": project.category,
        "created_at": project.created_at,
    } for project in projects]


@app.get("/api/projects/{slug}")
def get_project(slug: str, db: Session = Depends(get_db)) -> dict:
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return {
        "id": project.id,
        "title": project.title,
        "slug": project.slug,
        "description": project.description,
        "date": project.date,
        "location": project.location,
        "images": project.images,
        "category": project.category,
        "created_at": project.created_at,
    }


@app.post("/api/projects", status_code=status.HTTP_201_CREATED)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db), _: None = Depends(require_admin_api_key)) -> dict:
    project = Project(**payload.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return {"status": "success", "project_id": project.id}


@app.get("/api/collaborations")
def list_collaborations(db: Session = Depends(get_db)) -> list[dict]:
    collaborations = db.query(Collaboration).order_by(Collaboration.created_at.desc()).all()
    return [{
        "id": collaboration.id,
        "name": collaboration.name,
        "description": collaboration.description,
        "logo": collaboration.logo,
        "image": collaboration.image,
        "link": collaboration.link,
        "created_at": collaboration.created_at,
    } for collaboration in collaborations]


@app.post("/api/collaborations", status_code=status.HTTP_201_CREATED)
def create_collaboration(payload: CollaborationCreate, db: Session = Depends(get_db), _: None = Depends(require_admin_api_key)) -> dict:
    collaboration = Collaboration(**payload.model_dump())
    db.add(collaboration)
    db.commit()
    db.refresh(collaboration)
    return {"status": "success", "collaboration_id": collaboration.id}


@app.post("/api/contact", response_model=MessageResponse)
def submit_contact(payload: ContactMessage) -> MessageResponse:
    return MessageResponse(
        status="success",
        message="Votre message a bien été reçu. La cheffe reviendra vers vous très prochainement.",
        payload=payload.model_dump(),
    )
