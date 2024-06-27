from django.contrib import admin
from pair_paws_app.models import Pet, User, PetMateRequest, PetMateMatch

admin.site.register(Pet)
admin.site.register(User)
admin.site.register(PetMateRequest)
admin.site.register(PetMateMatch)