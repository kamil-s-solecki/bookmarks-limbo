import datetime

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from bookmarks.models import Bookmark, Tag
from bookmarks.serializers import BookmarkSerializer, TagSerializer


@api_view(['GET'])
def api_root(request):
    return Response({
        'bookmarks': reverse('bookmark-list', request=request),
    })


class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = Bookmark.objects.filter(owner=self.request.user)
        expired = self.request.query_params.get('expired', None)

        if expired == 'true':
            queryset = queryset.filter(expiration__lt=datetime.datetime.now())
        elif expired == 'false':
            queryset = queryset.filter(expiration__gte=datetime.datetime.now())

        return queryset


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Tag.objects.filter(owner=self.request.user)
