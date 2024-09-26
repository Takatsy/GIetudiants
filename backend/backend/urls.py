from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from ginscription.views import ViewParcours, ViewMention, ViewDomaine, ViewNiveau, ViewSemestre, ViewEtudiant, ViewMention, ViewGrade
from rest_framework import routers

route = routers.DefaultRouter()

route.register("Mention", ViewMention, basename='viewmention')
route.register("Parcours", ViewParcours, basename='viewparcours')
route.register("Domaine", ViewDomaine, basename='viewdomaine')
route.register("Niveau", ViewNiveau, basename='viewniveau')
route.register("Semestre", ViewSemestre, basename='viewsemestre')
route.register("Etudiant", ViewEtudiant, basename='viewetudiant')
route.register("Grade", ViewGrade, basename='viewgrade')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(route.urls)),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
