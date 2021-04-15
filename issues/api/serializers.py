from rest_framework import serializers
from issues.models import Issue


class IssueSerializer(serializers.ModelSerializer):
	"""
	Serializer for Issue Model
	"""
	class Meta:
		model = Issue
		fields = ('id', 'title', 'message',
					'email', 'responded')

	def create(self, validated_data):
		"""
		Create method
		"""
		issue = self.Meta.model(**validated_data)
		issue.save()

		return issue