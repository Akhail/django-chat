from django.db import models


# Create your models here.
class Message(models.Model):
    message_author = models.CharField('Autor', max_length=40)
    message_content = models.TextField('Contenido')
    
    def __str__(self):
        return self.message_author + " - " + self.message_content[:10]
