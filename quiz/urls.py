from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuizViewSet, SubmitQuizView, TextSummarizationView, GenerateQuizFromTextView, NotesGenerationView, FlashcardGenerationView

router = DefaultRouter()
router.register(r'quizzes', QuizViewSet, basename='quiz')

urlpatterns = [
    path('', include(router.urls)),
    path('quizzes/<int:quiz_id>/submit/', SubmitQuizView.as_view(), name='submit-quiz'),
    path('summarize/', TextSummarizationView.as_view(), name='summarize-text'),
    path('generate-quiz/', GenerateQuizFromTextView.as_view(), name='generate-quiz'),
    path('generate-notes/', NotesGenerationView.as_view(), name='generate-notes'),
    path('generate-flashcards/', FlashcardGenerationView.as_view(), name='generate-flashcards'),
]
