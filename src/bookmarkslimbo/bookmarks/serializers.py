from rest_framework import serializers

from bookmarks.models import Bookmark, Tag


class TagSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Tag
        fields = ('id', 'name')


class BookmarkSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    tags = serializers.SlugRelatedField(slug_field='name', read_only=True, many=True)

    class Meta:
        model = Bookmark
        fields = ('id', 'title', 'description', 'link', 'expiration', 'owner', 'tags')
