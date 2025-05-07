from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    # Podés agregar más campos personalizados aquí si querés:
    # avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    # bio = models.TextField(blank=True)

    def __str__(self):
        return self.username
