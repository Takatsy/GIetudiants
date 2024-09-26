import pytesseract
from django.shortcuts import render
from .models import Parcours
from .models import Mention
from .models import Semestre
from .models import Domaine
from .models import Niveau
from .models import Grade
from .models import Etudiant
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import cv2
import numpy as np
from .serializers import DomaineSerializer, EtudiantSerializer, GradeSerializer, MentionSerializer, ParcoursSerializer, SemestreSerializer, NiveauSerializer
from rest_framework import viewsets


# Create your views here.


class ViewDomaine(viewsets.ModelViewSet):
    queryset = Domaine.objects.all()
    serializer_class = DomaineSerializer

class ViewMention(viewsets.ModelViewSet):
    queryset = Mention.objects.all()
    serializer_class = MentionSerializer

class ViewParcours(viewsets.ModelViewSet):
    queryset = Parcours.objects.all()
    serializer_class = ParcoursSerializer  


class ViewSemestre(viewsets.ModelViewSet):
    queryset = Semestre.objects.all()
    serializer_class = SemestreSerializer

class ViewGrade(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

class ViewNiveau(viewsets.ModelViewSet):
    queryset = Niveau.objects.all()
    serializer_class = NiveauSerializer

class ViewEtudiant(viewsets.ModelViewSet):
    queryset = Etudiant.objects.all()
    serializer_class = EtudiantSerializer




