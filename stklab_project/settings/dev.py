from .base import *

DEBUG = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Frontend de Vite
    "http://127.0.0.1:8000",  # Backend de Django
]