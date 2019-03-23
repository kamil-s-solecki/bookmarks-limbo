import datetime

from rest_framework import viewsets, status, filters
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.reverse import reverse

from bookmarks.models import Bookmark, Tag
from bookmarks.serializers import BookmarkSerializer, TagSerializer


@api_view(['GET'])
def api_root(request):
    return Response({
        'bookmarks': reverse('bookmark-list', request=request),
    })


class IsPastExpirationDateFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        expired = request.query_params.get('expired', None)

        if expired == 'true':
            return queryset.filter(expiration__lt=datetime.datetime.now())
        elif expired == 'false':
            return queryset.filter(expiration__gte=datetime.datetime.now())
        else:
            return queryset


class IsOwnerFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(owner=request.user)


class TagsFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        tags_slug = request.query_params.get('tags', None)
        if tags_slug is not None:
            for tag in tags_slug.split(','):
                queryset = queryset.filter(tags__name=tag)
        return queryset


class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    filter_backends = (IsPastExpirationDateFilterBackend, IsOwnerFilterBackend, TagsFilterBackend)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['put'], serializer_class=TagSerializer)
    def tags(self, request, pk=None):
        bookmark = self.get_object()
        if request.data['name']:
            tag = self._get_tag(request.data['name'])
            bookmark.tags.add(tag)
            bookmark.save()
            return Response(data=bookmark)
        else:
            return Response('name is required',
                            status=status.HTTP_400_BAD_REQUEST)

    def _get_tag(self, name):
        tag = Tag.objects.filter(name=name).first()
        if tag is None:
            tag = Tag.objects.create(name=name, owner=self.request.user)
            tag.save()
        return tag


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Tag.objects.filter(owner=self.request.user)
