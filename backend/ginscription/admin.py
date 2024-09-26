from django.contrib import admin
from .models import Parcours
from .models import Mention
from .models import Semestre
from .models import Domaine
from .models import Niveau
from .models import Grade
from .models import Etudiant

# Register your models here.

admin.site.register(Parcours)
admin.site.register(Mention)
admin.site.register(Semestre)
admin.site.register(Domaine)
admin.site.register(Niveau)
admin.site.register(Grade) 
admin.site.register(Etudiant)


