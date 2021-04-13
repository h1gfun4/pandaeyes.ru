from django.db import models

class Direction(models.Model):
    """Статьи"""
    title = models.CharField("Название", max_length=100)
    description = models.TextField("Описание")
    poster = models.ImageField("Постер", upload_to="poster/")
    tagline = models.CharField("Слоган", max_length=100, default='')
    draft = models.BooleanField("Черновик", default=False)


