# Generated by Django 2.1.1 on 2018-12-04 05:57

from django.db import migrations, models
import django.utils.timezone
import home.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('is_campuspartner', models.BooleanField(default=False)),
                ('is_communitypartner', models.BooleanField(default=False)),
                ('avatar', models.ImageField(blank=True, default='profile_image/default.jpg', null=True, upload_to='profile_image')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', home.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('work_phone', models.CharField(max_length=14)),
                ('cell_phone', models.CharField(max_length=14)),
                ('email_id', models.EmailField(max_length=254, unique=True)),
                ('contact_type', models.CharField(choices=[('Primary', 'Primary'), ('Secondary', 'Secondary'), ('Other', 'Other')], default='Select', max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='HouseholdIncome',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id2', models.IntegerField()),
                ('county', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=255)),
                ('median_income', models.IntegerField()),
                ('margin_error', models.IntegerField()),
                ('rank', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='MissionArea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mission_name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
