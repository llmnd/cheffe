from datetime import datetime, timedelta, timezone
import hashlib
import hmac
from typing import Annotated

import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.config import settings
from app.database import create_db_and_tables, get_db
from app.models import Collaboration, ContactMessageRecord, Creation, GalleryItem, JournalPost, Project, Recipe
from app.schemas import (
    CollaborationCreate,
    ContactMessage,
    CreationCreate,
    GalleryItemCreate,
    JournalPostCreate,
    MessageResponse,
    ProjectCreate,
    RecipeCreate,
    AdminLogin,
    TokenResponse,
    ContactMessageUpdate,
)
from app.seed import seed_demo_data

app = FastAPI(title="Cheffe Khadidiatou API", version="0.1.0")


@app.middleware("http")
async def strip_vercel_service_prefix(request, call_next):
    prefix = "/_/backend"
    if request.scope["path"] == prefix or request.scope["path"].startswith(f"{prefix}/"):
        request.scope["path"] = request.scope["path"][len(prefix):] or "/"
    return await call_next(request)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bearer_scheme = HTTPBearer(auto_error=False)


@app.on_event("startup")
def startup_event() -> None:
    create_db_and_tables()
    seed_demo_data()


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "service": "cheffe-api"}

def verify_admin_password(password: str) -> bool:
    if settings.ADMIN_PASSWORD_HASH:
        try:
            algorithm, iterations, salt, expected = settings.ADMIN_PASSWORD_HASH.split("$", 3)
            if algorithm != "pbkdf2_sha256":
                return False
            derived = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), int(iterations)).hex()
            return hmac.compare_digest(derived, expected)
        except (ValueError, TypeError):
            return False
    return bool(settings.ADMIN_PASSWORD) and hmac.compare_digest(password, settings.ADMIN_PASSWORD)


@app.post("/api/auth/login", response_model=TokenResponse)
def admin_login(payload: AdminLogin) -> TokenResponse:
    if payload.email != settings.ADMIN_EMAIL or not verify_admin_password(payload.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    token = jwt.encode(
        {"sub": payload.email, "role": "admin", "exp": expires_at},
        settings.JWT_SECRET,
        algorithm="HS256",
    )
    return TokenResponse(access_token=token)


def require_admin(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
) -> None:
    if credentials is None or credentials.scheme.lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Bearer token required")

    try:
        claims = jwt.decode(credentials.credentials, settings.JWT_SECRET, algorithms=["HS256"])
    except jwt.PyJWTError as error:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token") from error

    if claims.get("role") != "admin" or claims.get("sub") != settings.ADMIN_EMAIL:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")


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
def create_recipe(payload: RecipeCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    recipe = Recipe(**payload.model_dump())
    db.add(recipe)
    db.commit()
    db.refresh(recipe)
    return {"status": "success", "recipe_id": recipe.id}


@app.put("/api/recipes/{recipe_id}")
def update_recipe(recipe_id: int, payload: RecipeCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe not found")
    for key, value in payload.model_dump().items():
        setattr(recipe, key, value)
    db.commit()
    return {"status": "success", "recipe_id": recipe.id}


@app.delete("/api/recipes/{recipe_id}")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe not found")
    db.delete(recipe)
    db.commit()
    return {"status": "success"}


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
def create_creation(payload: CreationCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    creation = Creation(**payload.model_dump())
    db.add(creation)
    db.commit()
    db.refresh(creation)
    return {"status": "success", "creation_id": creation.id}


@app.put("/api/creations/{creation_id}")
def update_creation(creation_id: int, payload: CreationCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    creation = db.query(Creation).filter(Creation.id == creation_id).first()
    if not creation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Creation not found")
    for key, value in payload.model_dump().items():
        setattr(creation, key, value)
    db.commit()
    return {"status": "success", "creation_id": creation.id}


@app.delete("/api/creations/{creation_id}")
def delete_creation(creation_id: int, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    creation = db.query(Creation).filter(Creation.id == creation_id).first()
    if not creation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Creation not found")
    db.delete(creation)
    db.commit()
    return {"status": "success"}


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
def create_journal_post(payload: JournalPostCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    post = JournalPost(**payload.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return {"status": "success", "post_id": post.id}


@app.put("/api/journal/{post_id}")
def update_journal_post(post_id: int, payload: JournalPostCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    post = db.query(JournalPost).filter(JournalPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journal post not found")
    for key, value in payload.model_dump().items():
        setattr(post, key, value)
    db.commit()
    return {"status": "success", "post_id": post.id}


@app.delete("/api/journal/{post_id}")
def delete_journal_post(post_id: int, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    post = db.query(JournalPost).filter(JournalPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journal post not found")
    db.delete(post)
    db.commit()
    return {"status": "success"}


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
def create_gallery_item(payload: GalleryItemCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    item = GalleryItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"status": "success", "gallery_item_id": item.id}


@app.put("/api/gallery/{item_id}")
def update_gallery_item(item_id: int, payload: GalleryItemCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found")
    for key, value in payload.model_dump().items():
        setattr(item, key, value)
    db.commit()
    return {"status": "success"}


@app.delete("/api/gallery/{item_id}")
def delete_gallery_item(item_id: int, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Gallery item not found")
    db.delete(item)
    db.commit()
    return {"status": "success"}


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
def create_project(payload: ProjectCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    project = Project(**payload.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return {"status": "success", "project_id": project.id}


@app.put("/api/projects/{project_id}")
def update_project(project_id: int, payload: ProjectCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    for key, value in payload.model_dump().items():
        setattr(project, key, value)
    db.commit()
    return {"status": "success"}


@app.delete("/api/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"status": "success"}


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
def create_collaboration(payload: CollaborationCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    collaboration = Collaboration(**payload.model_dump())
    db.add(collaboration)
    db.commit()
    db.refresh(collaboration)
    return {"status": "success", "collaboration_id": collaboration.id}


@app.put("/api/collaborations/{collaboration_id}")
def update_collaboration(collaboration_id: int, payload: CollaborationCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    collaboration = db.query(Collaboration).filter(Collaboration.id == collaboration_id).first()
    if not collaboration:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Collaboration not found")
    for key, value in payload.model_dump().items():
        setattr(collaboration, key, value)
    db.commit()
    return {"status": "success"}


@app.delete("/api/collaborations/{collaboration_id}")
def delete_collaboration(collaboration_id: int, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    collaboration = db.query(Collaboration).filter(Collaboration.id == collaboration_id).first()
    if not collaboration:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Collaboration not found")
    db.delete(collaboration)
    db.commit()
    return {"status": "success"}


@app.get("/api/contact")
def list_contact_messages(db: Session = Depends(get_db), _: None = Depends(require_admin)) -> list[dict]:
    messages = db.query(ContactMessageRecord).order_by(ContactMessageRecord.created_at.desc()).all()
    return [{"id": item.id, "name": item.name, "email": item.email, "phone": item.phone, "request_type": item.request_type, "message": item.message, "status": item.status, "created_at": item.created_at} for item in messages]


@app.post("/api/contact", response_model=MessageResponse)
def submit_contact(payload: ContactMessage, db: Session = Depends(get_db)) -> MessageResponse:
    db.add(ContactMessageRecord(**payload.model_dump()))
    db.commit()
    return MessageResponse(
        status="success",
        message="Votre message a bien été reçu. La cheffe reviendra vers vous très prochainement.",
        payload=payload.model_dump(),
    )


@app.patch("/api/contact/{message_id}")
def update_contact_message(message_id: int, payload: ContactMessageUpdate, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    message = db.query(ContactMessageRecord).filter(ContactMessageRecord.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact message not found")
    message.status = payload.status
    db.commit()
    return {"status": "success"}


@app.delete("/api/contact/{message_id}")
def delete_contact_message(message_id: int, db: Session = Depends(get_db), _: None = Depends(require_admin)) -> dict:
    message = db.query(ContactMessageRecord).filter(ContactMessageRecord.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact message not found")
    db.delete(message)
    db.commit()
    return {"status": "success"}
