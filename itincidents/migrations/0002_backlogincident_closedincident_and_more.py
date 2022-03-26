# Generated by Django 4.0.3 on 2022-03-14 15:54

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('itincidents', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BacklogIncident',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('incident_id', models.CharField(max_length=50)),
                ('priority', models.CharField(max_length=50)),
                ('incident_type', models.CharField(max_length=250)),
                ('incident_status', models.CharField(choices=[('PENDING', 'PENDING'), ('RESOLVED', 'RESOLVED'), ('CLOSED', 'CLOSED'), ('OPEN', 'OPEN')], max_length=50)),
                ('incident_description', models.CharField(max_length=500)),
                ('support_group', models.CharField(max_length=250)),
                ('tower_group', models.CharField(max_length=250)),
                ('domain_group', models.CharField(max_length=250)),
                ('resolution_description', models.CharField(max_length=250)),
                ('assigned_organization', models.CharField(max_length=250)),
                ('incident_category', models.CharField(max_length=250)),
                ('incident_element', models.CharField(max_length=250)),
                ('customer_location', models.CharField(max_length=250)),
                ('created_date', models.DateTimeField(blank=True, null=True)),
                ('resolution_date', models.DateTimeField(blank=True, null=True)),
                ('department', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ClosedIncident',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('incident_id', models.CharField(max_length=50)),
                ('priority', models.CharField(max_length=50)),
                ('incident_type', models.CharField(max_length=250)),
                ('incident_status', models.CharField(choices=[('PENDING', 'PENDING'), ('RESOLVED', 'RESOLVED'), ('CLOSED', 'CLOSED'), ('OPEN', 'OPEN')], max_length=50)),
                ('incident_description', models.CharField(max_length=500)),
                ('support_group', models.CharField(max_length=250)),
                ('tower_group', models.CharField(max_length=250)),
                ('domain_group', models.CharField(max_length=250)),
                ('resolution_description', models.CharField(max_length=250)),
                ('assigned_organization', models.CharField(max_length=250)),
                ('incident_category', models.CharField(max_length=250)),
                ('incident_element', models.CharField(max_length=250)),
                ('customer_location', models.CharField(max_length=250)),
                ('created_date', models.DateTimeField(blank=True, null=True)),
                ('resolution_date', models.DateTimeField(blank=True, null=True)),
                ('department', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='raisedincident',
            name='department',
            field=models.CharField(max_length=250, null=True),
        ),
    ]
