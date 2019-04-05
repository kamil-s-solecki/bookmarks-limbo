from django.urls import path, include
from rest_framework.routers import DefaultRouter

from bookmarks import views

ROUTER = DefaultRouter()
ROUTER.register(r'bookmarks', views.BookmarkViewSet)
ROUTER.register(r'tags', views.TagViewSet)

urlpatterns = [
    path('', include(ROUTER.urls)),
    path('', views.api_root),
]
