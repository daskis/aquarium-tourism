from django.db import models

class SubUser(models.Model):
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE, null=False, blank=False,
                                to_field='id', db_column='user_id')  # Поле для хранения ID пользователя
    username = models.CharField(max_length=100, unique=True)  # Имя пользователя
    user_class = models.CharField(max_length=100)  # Класс пользователя
    image_path = models.ImageField(upload_to='gameavatars/', null=True, blank=True)  # Путь к изображению
    speed = models.IntegerField(default=1)  # Параметр "скорость"
    cunning = models.IntegerField(default=1)  # Параметр "хитрость"
    luck = models.IntegerField(default=1)  # Параметр "удача"
    age = models.IntegerField()

    def __str__(self):
        return self.username


class Quests(models.Model):
    quest_id = models.AutoField(primary_key=True)
    title = models.TextField()
    description = models.TextField()
    image_path = models.ImageField(upload_to='quests/', blank=True, null=True)


class Offer(models.Model):
    offer_id = models.AutoField(primary_key=True)
    title = models.TextField()
    description = models.TextField()
    discount = models.CharField(max_length=50, blank=True, null=True)
    image_path = models.ImageField(upload_to='offers/', blank=True, null=True)



# Create your models here.
