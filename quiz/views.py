
import io
from rest_framework.parsers import MultiPartParser, FormParser
import PyPDF2
from rest_framework.views import APIView
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Quiz, Question, Option, UserQuizSubmission
from .serializers import QuizSerializer, QuizListSerializer, UserQuizSubmissionSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from transformers import pipeline
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from random import sample
import openai
import google.generativeai as genai
import os

def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() or ""
    return text
class NotesFromPDFView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        pdf_file = request.FILES.get('file')
        if not pdf_file:
            return Response({"error": "PDF file is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            text = extract_text_from_pdf(pdf_file)
            prompt = f"""
            Extract concise, well-structured study notes from the following text. Format the notes in bullet points and return as JSON with a 'notes' key.\n\nText:\n{text}
            """
            model = genai.GenerativeModel("gemini-2.5-flash")
            response = model.generate_content(prompt)
            return Response({"notes": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class FlashcardsFromPDFView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        pdf_file = request.FILES.get('file')
        if not pdf_file:
            return Response({"error": "PDF file is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            text = extract_text_from_pdf(pdf_file)
            prompt = f"""
            Generate keyword-based flashcards from the following text. Each flashcard should have a 'term' and a 'definition'. Keep flashcard abstract and short. Return as a JSON array under the key 'flashcards'.\n\nText:\n{text}
            """
            model = genai.GenerativeModel("gemini-2.5-flash")
            response = model.generate_content(prompt)
            return Response({"flashcards": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class QuizViewSet(viewsets.ModelViewSet):
    queryset=Quiz.objects.all()
    serializer_class=QuizListSerializer

    def retrieve(self, request, *args, **kwargs):
        quiz=self.get_object()
        serializer=QuizSerializer(quiz)
        return Response(serializer.data)
    
class SubmitQuizView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request,quiz_id):
        quiz=get_object_or_404(Quiz,id=quiz_id)
        questions=quiz.questions.all()
        data=request.data.get('answers',{})
        score=0

        for question in questions:
            correct_option=question.options.filter(is_correct=True).first()
            selected_option_id=data.get(str(question.id))

            if correct_option and str(correct_option.id)==str(selected_option_id):
                score+=1

        submission=UserQuizSubmission.objects.create(
            user=request.user if request.user.is_authenticated else None,
            quiz=quiz,
            score=score
        )

        serializezr=UserQuizSubmissionSerializer(submission)

        return Response(serializezr.data,status=status.HTTP_201_CREATED)
    

summarizer = pipeline("summarization")

class TextSummarizationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        text = request.data.get('text', '')

        if not text:
            return Response({"error": "Text is required"}, status=status.HTTP_400_BAD_REQUEST)

        if len(text.split()) < 5:
            return Response({"error": "Text is too short to summarize"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            summary = summarizer(text, max_length=100, min_length=25, do_sample=False)[0]['summary_text']
            return Response({"summary": summary}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

openai.api_key = os.getenv("OPENAI_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)

class GenerateQuizFromTextView(APIView):
    """
    POST /api/generate-quiz/
    {
        "text": "...",
        "provider": "openai" or "gemini"
    }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        text = request.data.get("text", "")
        provider = request.data.get("provider", "openai").lower()

        if not text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

        if provider not in ["openai", "gemini", "nltk"]:
            return Response({"error": "Invalid provider. Choose 'openai', 'gemini', or 'nltk'"},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            if provider == "openai":
                quiz = self.generate_with_openai(text)
            elif provider == "gemini":
                quiz = self.generate_with_gemini(text)
            else:  # NLTK simple keyword blanking
                quiz = self.generate_with_nltk(text)

            return Response({
                "provider": provider,
                "quiz": quiz
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def generate_with_openai(self, text):
        prompt = f"""
        Create 5 multiple-choice quiz questions based on the text below.
        Provide them in JSON format with keys: question, options, correct_answer.

        Text:
        {text}
        """
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a quiz generator."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message["content"]

    def generate_with_gemini(self, text):
        prompt = f"""
        Create 5 multiple-choice quiz questions based on this text.
        Each should have 4 options and specify the correct answer.
        Output in JSON.

        Text:
        {text}
        """
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return response.text

    def generate_with_nltk(self, text):
        sentences = sent_tokenize(text)
        quiz_questions = []
        for sent in sentences:
            words = word_tokenize(sent)
            keywords = [w for w in words if w.isalpha() and len(w) > 4]
            if keywords:
                answer = sample(keywords, 1)[0]
                question = sent.replace(answer, "_____")
                quiz_questions.append({
                    "question": question,
                    "answer": answer
                })
        return quiz_questions
    
class NotesGenerationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        text = request.data.get('text', '')

        if not text:
            return Response({"error": "Text is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            prompt = f"""
            Extract concise, well-structured study notes from the following text. Format the notes in bullet points and return as JSON with a 'notes' key.

            Text:
            {text}
            """
            model = genai.GenerativeModel("gemini-2.5-flash")
            response = model.generate_content(prompt)
            return Response({"notes": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FlashcardGenerationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        text = request.data.get('text', '')

        if not text:
            return Response({"error": "Text is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            prompt = f"""
            Generate keyword-based flashcards from the following text. Each flashcard should have a 'term' and a 'definition'. Keep flashcard abstract and short .Return as a JSON array under the key 'flashcards'.

            Text:
            {text}
            """
            model = genai.GenerativeModel("gemini-2.5-flash")
            response = model.generate_content(prompt)
            return Response({"flashcards": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GenerateQuizFromPDFView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        pdf_file = request.FILES.get('file')
        provider = request.data.get("provider", "openai").lower()
        if not pdf_file:
            return Response({"error": "PDF file is required"}, status=status.HTTP_400_BAD_REQUEST)
        if provider not in ["openai", "gemini", "nltk"]:
            return Response({"error": "Invalid provider. Choose 'openai', 'gemini', or 'nltk'"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            text = extract_text_from_pdf(pdf_file)
            if provider == "openai":
                quiz = self.generate_with_openai(text)
            elif provider == "gemini":
                quiz = self.generate_with_gemini(text)
            else:
                quiz = self.generate_with_nltk(text)
            return Response({
                "provider": provider,
                "quiz": quiz
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def generate_with_openai(self, text):
        prompt = f"""
        Create 5 multiple-choice quiz questions based on the text below.\nProvide them in JSON format with keys: question, options, correct_answer.\n\nText:\n{text}
        """
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a quiz generator."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message["content"]

    def generate_with_gemini(self, text):
        prompt = f"""
        Create 5 multiple-choice quiz questions based on this text.\nEach should have 4 options and specify the correct answer.\nOutput in JSON.\n\nText:\n{text}
        """
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return response.text

    def generate_with_nltk(self, text):
        sentences = sent_tokenize(text)
        quiz_questions = []
        for sent in sentences:
            words = word_tokenize(sent)
            keywords = [w for w in words if w.isalpha() and len(w) > 4]
            if keywords:
                answer = sample(keywords, 1)[0]
                question = sent.replace(answer, "_____")
                quiz_questions.append({
                    "question": question,
                    "answer": answer
                })
        return quiz_questions