from rest_framework import serializers
from .models import Quiz, Question, Option, UserQuizSubmission

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description', 'questions']

class QuizListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'description']

class UserQuizSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuizSubmission
        fields = ['id', 'user', 'quiz', 'score', 'submitted_at']