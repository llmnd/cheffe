from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, JSON, String, Text

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="admin", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(180), nullable=False)
    slug = Column(String(180), unique=True, index=True, nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    cover_image = Column(String(255), nullable=True)
    preparation_time = Column(String(50), nullable=True)
    cooking_time = Column(String(50), nullable=True)
    difficulty = Column(String(50), nullable=True)
    ingredients = Column(JSON, default=list, nullable=False)
    steps = Column(JSON, default=list, nullable=False)
    tips = Column(JSON, default=list, nullable=False)
    published = Column(Boolean, default=False, nullable=False)
    meta_title = Column(String(180), nullable=True)
    meta_description = Column(String(240), nullable=True)
    og_image = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Creation(Base):
    __tablename__ = "creations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(180), nullable=False)
    slug = Column(String(180), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    image = Column(String(255), nullable=True)
    category = Column(String(80), default="Signature", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    meta_title = Column(String(180), nullable=True)
    meta_description = Column(String(240), nullable=True)
    og_image = Column(String(255), nullable=True)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(180), nullable=False)
    slug = Column(String(180), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    date = Column(String(80), nullable=True)
    location = Column(String(120), nullable=True)
    images = Column(JSON, default=list, nullable=False)
    category = Column(String(80), default="Événement", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class JournalPost(Base):
    __tablename__ = "journal_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(180), nullable=False)
    slug = Column(String(180), unique=True, index=True, nullable=False)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    cover_image = Column(String(255), nullable=True)
    published = Column(Boolean, default=False, nullable=False)
    meta_title = Column(String(180), nullable=True)
    meta_description = Column(String(240), nullable=True)
    og_image = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(30), default="image", nullable=False)
    image_url = Column(String(255), nullable=True)
    video_url = Column(String(255), nullable=True)
    caption = Column(String(240), nullable=True)
    category = Column(String(80), default="Cuisine", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Collaboration(Base):
    __tablename__ = "collaborations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(180), nullable=False)
    description = Column(Text, nullable=False)
    logo = Column(String(255), nullable=True)
    image = Column(String(255), nullable=True)
    link = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class ContactMessageRecord(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    request_type = Column(String(80), default="collaboration", nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(30), default="new", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
