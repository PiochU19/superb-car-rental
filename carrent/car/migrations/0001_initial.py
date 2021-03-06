# Generated by Django 3.1.7 on 2021-04-06 14:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('brand', models.CharField(max_length=30)),
                ('model', models.CharField(max_length=30)),
                ('generation', models.CharField(blank=True, max_length=10)),
                ('engine', models.DecimalField(decimal_places=1, max_digits=2)),
                ('year_of_production', models.IntegerField()),
                ('body_type', models.CharField(max_length=20)),
                ('fuel_type', models.CharField(max_length=20)),
                ('hourse_power', models.IntegerField()),
                ('main_image', models.ImageField(upload_to='car_images/')),
                ('price_per_day', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='CarImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='car_images/')),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='car_images', to='car.car')),
            ],
            options={
                'ordering': ('car',),
            },
        ),
    ]
