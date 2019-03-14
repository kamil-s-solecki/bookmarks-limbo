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
