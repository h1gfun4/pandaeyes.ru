# Generated by Django 3.0.7 on 2020-07-07 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainBook', '0003_direction_tagline'),
    ]

    operations = [
        migrations.AddField(
            model_name='direction',
            name='url',
            field=models.SlugField(default=123, max_length=130, unique=True),
            preserve_default=False,
        ),
    ]