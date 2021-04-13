from django import template
from backend.models import Back

register = template.Library()

@register.inclusion_tag('backend/tags/scrollMenuB.html')
def get_back():
    scrollB = Back.objects.all()
    return {"scrollMenuB": scrollB }