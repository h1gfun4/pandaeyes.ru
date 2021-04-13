from django.db import models
from datetime import date


class Front(models.Model):
    title = models.CharField("Название", max_length=100)
    tagline = models.CharField("Слоган", max_length=300, default='')
    description = models.TextField("Пост")
    homework = models.TextField("Домашнее задание")
    poster = models.ImageField("Постер", upload_to="frontend_poster/")
    year = models.DateField("Дата публикации", default=date.today)
    url = models.SlugField(max_length=130, unique=True)
    draft = models.BooleanField("Черновик", default=False)