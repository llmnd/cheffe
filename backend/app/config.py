import os
from pathlib import Path

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[2]
load_dotenv(ROOT_DIR / ".env.local")


class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./cheffe.db")
    ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "cheffe-admin-dev")
    APP_NAME = "Cheffe Khadidiatou API"


settings = Settings()
