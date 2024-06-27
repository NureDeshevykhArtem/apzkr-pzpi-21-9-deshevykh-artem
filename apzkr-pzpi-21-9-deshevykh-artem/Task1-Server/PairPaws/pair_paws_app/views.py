from rest_framework import viewsets
from .serializers import *
from .models import *

class PetsViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ManagersViewSet(viewsets.ModelViewSet):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer

class AdminsViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class PetMateRequestsViewSet(viewsets.ModelViewSet):
    queryset = PetMateRequest.objects.all()
    serializer_class = PetMateRequestSerializer

class PetMateMatchesViewSet(viewsets.ModelViewSet):
    queryset = PetMateMatch.objects.all()
    serializer_class = PetMateMatchSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer