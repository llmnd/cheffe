import os
from pathlib import Path

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[2]
load_dotenv(ROOT_DIR / ".env.local")


class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./cheffe.db")
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@cheffe-khadidiatou.com")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")
    ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH", "")
    JWT_SECRET = os.getenv("JWT_SECRET", "change-me-before-production")
    JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))
    APP_NAME = "Cheffe Khadidiatou API"


settings = Settings()
