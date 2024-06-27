from django.db import models

class Pet(models.Model):
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=50)
    breed = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    pets = models.ManyToManyField(Pet, related_name='owners', blank=True)

    def __str__(self):
        return self.username

class Manager(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    managed_pets = models.ManyToManyField(Pet, related_name='managers', blank=True)

    def __str__(self):
        return f"Manager: {self.username}"

class Admin(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return f"Admin: {self.username}"

class PetMateRequest(models.Model):
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requested_requests')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status_choices = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=10, choices=status_choices, default='pending')

    def __str__(self):
        return f"Request from {self.requester.username} for {self.pet.name}"

class PetMateMatch(models.Model):
    request = models.ForeignKey(PetMateRequest, on_delete=models.CASCADE)
    partner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matched_partners')
    accepted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Match between {self.request.requester.username} and {self.partner.username}"

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    message_text = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username}"

class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_reviews')
    reviewed_partner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_reviews')
    review_text = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return f"Review of {self.reviewed_partner.username} by {self.reviewer.username}"