from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string

from django.core.mail import (
	EmailMessage,
	EmailMultiAlternatives
)

from django.utils.encoding import (
	force_bytes,
	force_text,
	DjangoUnicodeDecodeError
)

from django.utils.http import (
	urlsafe_base64_encode,
	urlsafe_base64_decode
)

from .tokens import (
	token_generator,
	token_password_reset_generator,
)

from django.utils.html import strip_tags


def send_mail_confirmation(request, user, to_email):
	"""
	function sending email
	after registration
	"""
	current_site = get_current_site(request)
	mail_subject = 'Confirm you email'

	html_message = render_to_string('email-template.html', {
		'user': user,
		'domain': current_site.domain,
		'uid': urlsafe_base64_encode(force_bytes(user.pk)),
		'token': token_generator.make_token(user),
	})
	text_content = strip_tags(html_message)

	email = EmailMultiAlternatives(mail_subject, text_content, 'car.superb.rental@gmail.com', [to_email])
	email.attach_alternative(html_message, 'text/html')

	email.send()


def send_mail_password_reset(user):
	"""
	function sending email
	after password reset request
	"""
	mail_subject = 'Password reset'

	html_message = render_to_string('email-password-template.html', {
		'uid': urlsafe_base64_encode(force_bytes(user.pk)),
		'token': token_password_reset_generator.make_token(user),
	})
	text_content = strip_tags(html_message)

	email = EmailMultiAlternatives(mail_subject, text_content, 'car.superb.rental@gmail.com', [user.email])
	email.attach_alternative(html_message, 'text/html')

	email.send()


# import re
import re


def password_check(string):
	if re.match("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$", string):
		return True
	return False