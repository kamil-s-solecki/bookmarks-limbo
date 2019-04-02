from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny

from auth.serializers import UserSerializer


class UserCreateView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer


class UserRetrieveView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
