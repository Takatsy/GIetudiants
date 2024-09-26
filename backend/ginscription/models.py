from django.db import models

# Create your models here.

class Domaine(models.Model):
    Nom_Domaine = models.CharField(max_length=50, null=True,blank=False)

    def __str__(self):
        return self.Nom_Domaine
    
class Mention(models.Model):
    Domaine = models.ForeignKey(Domaine, on_delete=models.CASCADE, related_name='mentions')
    Nom_Mention = models.CharField(max_length=50)
   

    def __str__(self):
        return  self.Nom_Mention
    
class Parcours(models.Model):
    Mention = models.ForeignKey(Mention, on_delete=models.CASCADE, related_name='parcours')
    Nom_Parcours = models.CharField(max_length=50, null=True, blank=False)
    

    def __str__(self):
        return  self.Nom_Parcours
    
class Grade(models.Model):
    Nom_Grade = models.CharField(max_length=50)

    def __str__(self):
        return self.Nom_Grade
    
class Niveau(models.Model):
    Grade = models.ForeignKey(Grade, on_delete=models.CASCADE, related_name='niveaux')
    Type_Niveau = models.CharField(max_length=50)

    def __str__(self):
        return self.Type_Niveau

class Etudiant(models.Model):
    Parcours = models.ForeignKey(Parcours, on_delete=models.CASCADE, related_name='etudiants')
    Niveau = models.ForeignKey(Niveau,on_delete=models.CASCADE, related_name='etudiants')
    Nom = models.CharField(max_length=50)
    Prenom = models.CharField(max_length=50)
    Datenaiss = models.DateField()
    Lieunaiss = models.CharField(max_length=50)
    Nationalite = models.CharField(max_length=10)
    Cin = models.PositiveIntegerField(null=True,blank=True)
    Date_cin = models.DateField(null=True,blank=True)
    Lieu_cin = models.CharField(max_length=50,null=True, blank=True)
    Nom_pere = models.CharField(max_length=50, null=True, blank=True)
    Profession_pere = models.CharField(max_length=50, null=True, blank=True)
    Nom_mere = models.CharField(max_length=50, null=True, blank=True)
    Profession_mere = models.CharField(max_length=50, null=True, blank=True)
    Nom_tuteur = models.CharField(max_length=50, null=True,blank=True)
    Profession_tuteur = models.CharField(max_length=50, null=True, blank=True)
    Telephone = models.PositiveIntegerField(null=True, blank=True)
    Adresse_parents = models.CharField(max_length=50)
    Bacc_num_inscription = models.PositiveIntegerField() 
    Bacc_annee = models.DateField()
    Bacc_serie = models.CharField(max_length=4)
    Bacc_centre = models.CharField(max_length=50)
    Bacc_secteur = models.CharField(max_length=50)
    Sesion = models.CharField(max_length=50)
    Date_inscription = models.DateField()



    def __str__(self):
        return f"{self.Nom} {self.Prenom}"
    


    
class Semestre(models.Model):
    Grade = models.ForeignKey(Grade, on_delete=models.CASCADE, related_name='semestres')
    Type_semestre = models.CharField(max_length=50)
  

    def __str__(self) -> str:
        return self.Type_semestre