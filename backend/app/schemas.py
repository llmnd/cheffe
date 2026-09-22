from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class RecipeBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    cover_image: Optional[str] = None
    preparation_time: Optional[str] = None
    cooking_time: Optional[str] = None
    difficulty: Optional[str] = None
    ingredients: List[str] = Field(default_factory=list)
    steps: List[str] = Field(default_factory=list)
    tips: List[str] = Field(default_factory=list)
    published: bool = False
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    og_image: Optional[str] = None


class RecipeCreate(RecipeBase):
    pass


class RecipeRead(RecipeBase):
    id: int
    created_at: datetime
    updated_at: datetime


class CreationBase(BaseModel):
    title: str
    slug: str
    description: str
    image: Optional[str] = None
    category: str = "Signature"
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    og_image: Optional[str] = None


class CreationCreate(CreationBase):
    pass


class CreationRead(CreationBase):
    id: int
    created_at: datetime


class ProjectBase(BaseModel):
    title: str
    slug: str
    description: str
    date: Optional[str] = None
    location: Optional[str] = None
    images: List[str] = Field(default_factory=list)
    category: str = "Événement"


class ProjectCreate(ProjectBase):
    pass


class ProjectRead(ProjectBase):
    id: int
    created_at: datetime


class JournalPostBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    cover_image: Optional[str] = None
    published: bool = False
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    og_image: Optional[str] = None


class JournalPostCreate(JournalPostBase):
    pass


class JournalPostRead(JournalPostBase):
    id: int
    created_at: datetime
    updated_at: datetime


class GalleryItemBase(BaseModel):
    type: str = "image"
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    caption: Optional[str] = None
    category: str = "Cuisine"


class GalleryItemCreate(GalleryItemBase):
    pass


class GalleryItemRead(GalleryItemBase):
    id: int
    created_at: datetime


class CollaborationBase(BaseModel):
    name: str
    description: str
    logo: Optional[str] = None
    image: Optional[str] = None
    link: Optional[str] = None


class CollaborationCreate(CollaborationBase):
    pass


class CollaborationRead(CollaborationBase):
    id: int
    created_at: datetime


class ContactMessage(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    request_type: str = "collaboration"
    message: str


class MessageResponse(BaseModel):
    status: str
    message: str
    payload: dict
