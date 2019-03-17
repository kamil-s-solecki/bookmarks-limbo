from django.contrib.auth.models import User
from rest_framework import serializers, fields


class UserSerializer(serializers.ModelSerializer):
    username = fields.CharField()
    email = fields.EmailField()
    password = fields.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
