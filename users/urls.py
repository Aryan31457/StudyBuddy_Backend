from django.urls import path
from .views import RegisterView, LoginView, StudentChatbotView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path("chat/", StudentChatbotView.as_view(), name="student_chatbot"),
]
