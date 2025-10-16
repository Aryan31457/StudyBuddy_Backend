from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuizViewSet, SubmitQuizView, TextSummarizationView, GenerateQuizFromTextView, NotesGenerationView, FlashcardGenerationView, NotesFromPDFView, FlashcardsFromPDFView, GenerateQuizFromPDFView

router = DefaultRouter()
router.register(r'quizzes', QuizViewSet, basename='quiz')

urlpatterns = [
    path('', include(router.urls)),
    path('quizzes/<int:quiz_id>/submit/', SubmitQuizView.as_view(), name='submit-quiz'),
    path('summarize/', TextSummarizationView.as_view(), name='summarize-text'),
    path('generate-quiz/', GenerateQuizFromTextView.as_view(), name='generate-quiz'),
    path('generate-quiz-pdf/', GenerateQuizFromPDFView.as_view(), name='generate-quiz-pdf'),
    path('generate-notes/', NotesGenerationView.as_view(), name='generate-notes'),
    path('generate-flashcards/', FlashcardGenerationView.as_view(), name='generate-flashcards'),
    path('generate-notes-pdf/', NotesFromPDFView.as_view(), name='generate-notes-pdf'),
    path('generate-flashcards-pdf/', FlashcardsFromPDFView.as_view(), name='generate-flashcards-pdf'),
]
