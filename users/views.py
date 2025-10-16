from rest_framework import generics
from .models import CustomUser
from rest_framework.views import APIView
from .serializers import RegisterSerializer
from rest_framework.response import Response
from .serializers import LoginSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
import google.generativeai as genai
import os

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role,
                }
            })
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)




genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

class StudentChatbotView(APIView):
    def post(self, request):
        query = request.data.get("question")

        if not query:
            return Response({"error": "Question is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Use Gemini model
            model = genai.GenerativeModel("gemini-2.5-flash")
            response = model.generate_content(query)

            return Response({
                "question": query,
                "answer": response.text
            })

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
