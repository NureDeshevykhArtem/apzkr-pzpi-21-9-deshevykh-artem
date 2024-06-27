from rest_framework import serializers
from pair_paws_app.models import Pet, User, PetMateRequest, PetMateMatch, Manager, Admin, Review, Message

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class PetMateRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetMateRequest
        fields = '__all__'

class PetMateMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetMateMatch
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'