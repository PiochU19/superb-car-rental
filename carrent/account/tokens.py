from django.contrib.auth.tokens import PasswordResetTokenGenerator
from six import text_type


class TokenGenerator(PasswordResetTokenGenerator):
	"""
	Unique token generator
	for email confirmation
	"""
	def _make_hash_value(self, user, timestamp):
		return (text_type(user.is_active) + text_type(user.pk) + text_type(timestamp))


token_generator = TokenGenerator()


class TokenPasswordResetGenerator(PasswordResetTokenGenerator):
	"""
	Unique token generator
	for password reset
	"""
	def _make_hash_value(self, user, timestamp):
		return (text_type(user.is_active) + text_type(user.pk) + text_type(timestamp))


token_password_reset_generator = TokenPasswordResetGenerator()