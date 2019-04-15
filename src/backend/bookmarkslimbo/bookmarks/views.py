import datetime

from rest_framework import viewsets, status, filters
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.reverse import reverse

from bookmarks.models import Bookmark, Tag
from bookmarks.serializers import BookmarkSerializer, TagSerializer, BookmarkCreateUpdateSerializer


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
        if expired == 'false':
            return queryset.filter(expiration__gte=datetime.datetime.now())

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
    filter_backends = (IsPastExpirationDateFilterBackend, IsOwnerFilterBackend, TagsFilterBackend)

    def perform_create(self, serializer):
        self._perform_update_or_create(serializer)

    def perform_update(self, serializer):
        self._perform_update_or_create(serializer)

    @action(detail=True, methods=['put'], serializer_class=TagSerializer)
    def tags(self, request, pk=None):  # pylint: disable=invalid-name
        bookmark = self.get_object()
        if request.data['name']:
            tag = self._get_tag(request.data['name'])
            bookmark.tags.add(tag)
            bookmark.save()
            return Response(data=bookmark)

        return Response('name is required',
                        status=status.HTTP_400_BAD_REQUEST)

    def get_serializer_class(self):
        return BookmarkCreateUpdateSerializer if self.request.method in ['POST', 'PUT'] else BookmarkSerializer

    def _get_tag(self, name):
        tag = Tag.objects.filter(name=name).first()
        if tag is None:
            tag = Tag.objects.create(name=name, owner=self.request.user)
            tag.save()
        return tag

    def _perform_update_or_create(self, serializer):
        tags = [self._get_tag(tag) for tag in serializer.validated_data['tags']]
        serializer.save(owner=self.request.user, tags=tags)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = (IsOwnerFilterBackend,)
