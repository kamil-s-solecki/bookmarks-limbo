from rest_framework import serializers

from bookmarks.models import Bookmark, Tag


class TagSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Tag
        fields = ('id', 'name', 'owner')


class BookmarkSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(slug_field='name', read_only=True, many=True)

    class Meta:
        model = Bookmark
        fields = ('id', 'title', 'description', 'link', 'expiration', 'tags')


class BookmarkCreateUpdateSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), write_only=True)
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Bookmark
        fields = ('id', 'title', 'description', 'link', 'expiration', 'owner', 'tags', 'owner')
