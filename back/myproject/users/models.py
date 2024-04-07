from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin, UserManager, AbstractBaseUser
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):
    def create_user(self, username, email, password, **extra_fields):
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        if password is None:
            raise TypeError('Users must have an password.')

        user = self.model(username=username, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):

        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_active") is not True:
            raise ValueError(("is_active must be true for admin user"))

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(("is_superuser must be true for admin user"))

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    refresh_token = models.CharField(max_length=1000, default=None, null=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    @property
    def is_staff(self):
        return self.is_superuser

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        self.refresh_token = str(refresh)
        self.save()
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    class Meta:
        permissions = [
            ("change_role", "Can change the role of user"),
        ]

class SubUser(models.Model):
    user_id = models.AutoField(primary_key=True)  # Поле для хранения ID пользователя
    username = models.CharField(max_length=100)  # Имя пользователя
    user_class = models.CharField(max_length=100)  # Класс пользователя
    image_path = models.CharField(max_length=100)  # Путь к изображению
    speed = models.IntegerField(default=1)  # Параметр "скорость"
    cunning = models.IntegerField(default=1)  # Параметр "хитрость"
    luck = models.IntegerField(default=1)  # Параметр "удача"

    def __str__(self):
        return self.username

class OneTimePassword(models.Model):
    email = models.EmailField(max_length=255, blank=True, null=True)
    otp = models.CharField(max_length=6)

# Create your models here.
