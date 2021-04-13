from django.db import models
from datetime import date

from django.urls import reverse

class Article(models.Model):
    """Статьи"""
    title = models.CharField("Название", max_length=100)
    tagline = models.CharField("Слоган", max_length=100, default='')
    description = models.TextField("Описание")
    poster = models.ImageField("Постер", upload_to="poster/")
    year = models.DateField("Дата публикации", default=date.today)
    url = models.SlugField(max_length=130, unique=True)
    draft = models.BooleanField("Черновик", default=False)
    

    def __str__(self):
        return self.title
    

    def get_absolute_url(self):
        return reverse("article_namber", kwargs={"slug": self.url})

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"