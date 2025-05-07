# 🛠️ STKLab Backend - Setup Profesional con Django REST Framework

Este documento resume el paso a paso profesional que seguimos para construir el backend del proyecto **STKLab**, una app web para diseñadores de calcomanías, usando **Django REST Framework** con estructura modular, autenticación JWT y entorno separado (base/dev/prod).

---

## 📁 Estructura del Proyecto Inicial

```
stklab_project/
├── manage.py
├── stklab_project/
│   ├── __init__.py
│   ├── asgi.py
│   ├── wsgi.py
│   └── settings/
│       ├── __init__.py
│       ├── base.py
│       ├── dev.py
│       └── prod.py
├── users/
└── tasks/ (por crear)
```

---

## ⚙️ Configuración de Entornos (base/dev/prod)

### `settings/base.py`

Contiene:

* Configuración común (apps, middlewares, REST, JWT)
* Variables compartidas

### `settings/dev.py`

Importa todo desde base y añade:

```python
from .base import *

DEBUG = True
ALLOWED_HOSTS = ['*']
```

### `settings/prod.py`

Importa desde base y configura para producción:

```python
from .base import *

DEBUG = False
ALLOWED_HOSTS = ['tudominio.com']
```

Ejemplo de uso:

```bash
python manage.py runserver --settings=stklab_project.settings.dev
```

---

## 👤 App `users` con modelo de usuario personalizado

### `users/models.py`

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username
```

### `settings/base.py`

```python
AUTH_USER_MODEL = 'users.CustomUser'
```

### Migraciones:

```bash
python manage.py makemigrations users --settings=stklab_project.settings.dev
python manage.py migrate --settings=stklab_project.settings.dev
```

---

## 🔐 JWT con `djangorestframework-simplejwt`

### Instalación:

```bash
pip install djangorestframework-simplejwt
```

### `settings/base.py`

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
```

### Rutas en `users/urls.py`

```python
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

### `stklab_project/urls.py`

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
]
```

---

## 🧾 Registro de usuarios con JWT automático

### `users/serializers.py`

```python
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def to_representation(self, instance):
        refresh = RefreshToken.for_user(instance)
        return {
            "user": {
                "id": instance.id,
                "username": instance.username,
                "email": instance.email
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
```

### `users/views.py`

```python
from rest_framework import generics
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
```

### `users/urls.py`

```python
from .views import RegisterView

urlpatterns += [
    path('register/', RegisterView.as_view(), name='register'),
]
```

---

## 🧪 Endpoints activos hasta ahora

| Método | Endpoint                  | Descripción               |
| ------ | ------------------------- | ------------------------- |
| POST   | `/api/users/login/`       | Login con username/pass   |
| POST   | `/api/users/refresh/`     | Renovar access token      |
| POST   | `/api/users/register/`    | Registrar nuevo usuario   |
| GET    | `/api/users/protected/`\* | Vista protegida de prueba |

`*`: Solo si creaste la vista opcional protegida.

---

Listo, con esto ya tenés un backend profesional, extensible y seguro. ¿Listo para continuar con la app `tasks` y el dashboard?
