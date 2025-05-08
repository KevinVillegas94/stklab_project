from .serializers import RegisterSerializer, UserSerializer  # Importa ambos
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import CustomUser  # Asegúrate de que CustomUser esté importado
from .serializers import UserSerializer  # Debes crear este serializador (ver paso 2)

class UserListView(generics.ListAPIView):  # ¡El nombre debe coincidir exactamente!
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # O usa [IsAuthenticated] para restringir acceso

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]