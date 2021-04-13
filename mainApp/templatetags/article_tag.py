from django import template
from mainBlog.models import Article 

register = template.Library()

@register.inclusion_tag('mainApp/tags/last_article.html')
def get_last_article():
    articles = Article.objects.order_by("?")[:3]
    return {"last_article": articles}
