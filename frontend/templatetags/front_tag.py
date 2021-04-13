from django import template
from frontend.models import Front

register = template.Library()

@register.inclusion_tag('frontend/tags/scrollMenu.html')
def get_front():
    scroll = Front.objects.all()
    return {"scrollMenu": scroll }
