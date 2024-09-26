from rest_framework import serializers
from .models import Parcours, Mention, Semestre, Domaine, Niveau, Grade, Etudiant



class DomaineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domaine
        fields  = '__all__'

class MentionSerializer(serializers.ModelSerializer):

    Domaine = serializers.PrimaryKeyRelatedField(queryset=Domaine.objects.all(), write_only=True)  # Pour les ajouts
    Domaine_Info = DomaineSerializer(source='Domaine', read_only=True)  # Pour l'affichage
    
    class Meta:
        model = Mention
        fields  = '__all__'


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields  = '__all__'


class ParcoursSerializer(serializers.ModelSerializer):

    Mention = serializers.PrimaryKeyRelatedField(queryset=Mention.objects.all(), write_only=True)  # Pour les ajouts
    Mention_Info = MentionSerializer(source='Mention', read_only=True)  # Pour l'affichage

    class Meta:
        model = Parcours
        fields = '__all__'


class SemestreSerializer(serializers.ModelSerializer):

    Grade = serializers.PrimaryKeyRelatedField(queryset=Grade.objects.all(), write_only=True)  # Pour les ajouts
    Grade_Info = GradeSerializer(source='Grade', read_only=True)  # Pour l'affichage

    class Meta:
        model = Semestre
        fields  = '__all__'


class NiveauSerializer(serializers.ModelSerializer):

    Grade = serializers.PrimaryKeyRelatedField(queryset=Grade.objects.all(), write_only=True)  # Pour les ajouts
    Grade_Info = GradeSerializer(source='Grade', read_only=True)  # Pour l'affichage

    class Meta:
        model = Niveau
        fields  = '__all__'


class EtudiantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etudiant
        fields  = '__all__'
