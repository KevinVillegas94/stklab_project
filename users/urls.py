from django.urls import path
from .views import RegisterView, UserListView  # Asegúrate de que ambos nombres coincidan
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),  # GET /api/users/
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
]