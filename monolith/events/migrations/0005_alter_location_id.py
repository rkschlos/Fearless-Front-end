# Generated by Django 4.0.3 on 2022-04-28 03:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_create_states'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='id',
            field=models.PositiveIntegerField(primary_key=True, serialize=False),
        ),
    ]