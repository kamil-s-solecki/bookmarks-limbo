from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
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

    def validate_password(self, value):  # pylint: disable=no-self-use
        try:
            validate_password(value)
        except ValidationError as exc:
            raise serializers.ValidationError(str(exc))
        return value

    def validate_email(self, value): # pylint: disable=no-self-use
        if User.objects.filter(email=value).count() > 0:
            raise serializers.ValidationError('This email already exists!')
        return value

    def validate_username(self, value): # pylint: disable=no-self-use
        if User.objects.filter(username=value).count() > 0:
            raise serializers.ValidationError('This username already exists!')
        return value


    class Meta:
        model = User
        fields = ('username', 'email', 'password')
