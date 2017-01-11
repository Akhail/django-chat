
from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^$', chat_room, name='main'),
    url(r'^get-message/(?:starting=(\d+))?', get_message, name='get-messages'),
    url(r'^send-message', send_message, name='send-message')
]
