from django.shortcuts import render
from .models import Message
from django.http import HttpResponse
from django.core.serializers import serialize


# Create your views here.
def chat_room(request):
    return render(request, 'django_chat/chat-room.html')


def get_message(request, starting):
    if request.method == 'GET':
        data = Message.objects.filter(id__gt=starting or 0).order_by('-id')[:30:-1]
        data = serialize('json', data)
        return HttpResponse(data, content_type='json')
    return HttpResponse(starting)


def send_message(request):
    if request.method == 'GET':
        author = request.GET['author']
        content = request.GET['content']
        msg = Message(message_author=author, message_content=content)
        msg.save()
    return HttpResponse('')
