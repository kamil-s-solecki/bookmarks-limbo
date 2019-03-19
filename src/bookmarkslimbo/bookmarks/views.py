import datetime

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from bookmarks.models import Bookmark
from bookmarks.serializers import BookmarkSerializer


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
