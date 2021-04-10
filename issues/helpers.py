from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import (
	EmailMessage,
	EmailMultiAlternatives
)


def send_email_issue_confirmation(request, id, email):
	"""
	confirmation that stuff
	received the issue
	"""
	mail_subject = 'Issue number #'+ str(id)

	html_message = render_to_string('issue-template.html', {
		'id': id,
	})
	text_content = strip_tags(html_message)

	email = EmailMultiAlternatives(
		mail_subject,
		text_content,
		'car.superb.rental@gmail.com',
		[email],
	)
	email.attach_alternative(html_message, 'text/html')

	email.send()