from django.db import models
import uuid

# Create your models here.

class RaisedIncident(models.Model):

    STATUS = (
        ('PENDING', 'PENDING'),
        ('RESOLVED', 'RESOLVED'),
        ('CLOSED', 'CLOSED'),
        ('OPEN', 'OPEN'),
    )

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    incident_id = models.CharField(max_length=50)
    priority = models.CharField(max_length=50)
    incident_type = models.CharField(max_length=250)
    incident_status = models.CharField(max_length=50, choices=STATUS)
    incident_description = models.CharField(max_length=500)
    
    support_group = models.CharField(max_length=250)
    tower_group = models.CharField(max_length=250)
    domain_group = models.CharField(max_length=250)

    resolution_description =  models.CharField(max_length=250)
    assigned_organization =  models.CharField(max_length=250)

    incident_category =  models.CharField(max_length=250)
    incident_element = models.CharField(max_length=250)
    customer_location = models.CharField(max_length=250)
    

    created_date = models.DateTimeField(null=True, blank=True)
    resolution_date = models.DateTimeField(null=True, blank=True)
    department = models.CharField(max_length=250,null=True)
    # department = models.ForeignKey(Department, on_delete=CASCADE, null=True, blank=True)

    def __repr__(self):
        return self.incident_id
    
    def __str__(self):
        return self.incident_id
 
class ClosedIncident(models.Model):

    STATUS = (
        ('PENDING', 'PENDING'),
        ('RESOLVED', 'RESOLVED'),
        ('CLOSED', 'CLOSED'),
        ('OPEN', 'OPEN'),
    )

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    incident_id = models.CharField(max_length=50)
    priority = models.CharField(max_length=50)
    incident_type = models.CharField(max_length=250)
    incident_status = models.CharField(max_length=50, choices=STATUS)
    incident_description = models.CharField(max_length=500)
    
    support_group = models.CharField(max_length=250)
    tower_group = models.CharField(max_length=250)
    domain_group = models.CharField(max_length=250)

    resolution_description =  models.CharField(max_length=250)
    assigned_organization =  models.CharField(max_length=250)

    incident_category =  models.CharField(max_length=250)
    incident_element = models.CharField(max_length=250)
    customer_location = models.CharField(max_length=250)
    

    created_date = models.DateTimeField(null=True, blank=True)
    resolution_date = models.DateTimeField(null=True, blank=True)
    department = models.CharField(max_length=250,null=True)
    # department = models.ForeignKey(Department, on_delete=CASCADE, null=True, blank=True)

    def __repr__(self):
        return self.incident_id
    
    def __str__(self):
        return self.incident_id



    
class BacklogIncident(models.Model):

    STATUS = (
        ('PENDING', 'PENDING'),
        ('RESOLVED', 'RESOLVED'),
        ('CLOSED', 'CLOSED'),
        ('OPEN', 'OPEN'),
    )

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    incident_id = models.CharField(max_length=50)
    priority = models.CharField(max_length=50)
    incident_type = models.CharField(max_length=250)
    incident_status = models.CharField(max_length=50, choices=STATUS)
    incident_description = models.CharField(max_length=500)
    
    support_group = models.CharField(max_length=250)
    tower_group = models.CharField(max_length=250)
    domain_group = models.CharField(max_length=250)

    resolution_description =  models.CharField(max_length=250)
    assigned_organization =  models.CharField(max_length=250)

    incident_category =  models.CharField(max_length=250)
    incident_element = models.CharField(max_length=250)
    customer_location = models.CharField(max_length=250)
    

    created_date = models.DateTimeField(null=True, blank=True)
    resolution_date = models.DateTimeField(null=True, blank=True)
    department = models.CharField(max_length=250,null=True)
    # department = models.ForeignKey(Department, on_delete=CASCADE, null=True, blank=True)

    def __repr__(self):
        return self.incident_id
    
    def __str__(self):
        return self.incident_id

# class ClosedIncident(models.Model):
#     STATUS = (
#         ('PENDING', 'PENDING'),
#         ('RESOLVED', 'RESOLVED'),
#         ('CLOSED', 'CLOSED'),
#         ('OPEN', 'OPEN'),
#     )

#     id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
#     incident_id = models.CharField(max_length=50)
#     priority = models.CharField(max_length=50)
#     incident_type = models.CharField(max_length=250)
#     incident_status = models.CharField(max_length=50, choices=STATUS)
#     created_date = models.DateTimeField()
#     resolution_date = models.DateTimeField(null=True, blank=True)
#     # department = models.ForeignKey(Department, on_delete=CASCADE, null=True, blank=True)

#     def __repr__(self):
#         return self.incident_id
    
#     def __str__(self):
#         return self.incident_id


# class BacklogIncident(models.Model):
#     STATUS = (
#         ('PENDING', 'PENDING'),
#         ('RESOLVED', 'RESOLVED'),
#         ('CLOSED', 'CLOSED'),
#         ('OPEN', 'OPEN'),
#     )

#     id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
#     incident_id = models.CharField(max_length=50)
#     priority = models.CharField(max_length=50)
#     incident_type = models.CharField(max_length=250)
#     incident_status = models.CharField(max_length=50, choices=STATUS)
#     created_date = models.DateTimeField(null=True, blank=True)
#     resolution_date = models.DateTimeField(null=True, blank=True)
#     # department = models.ForeignKey(Department, on_delete=CASCADE, null=True, blank=True)
#     for_month = models.SmallIntegerField(default=1)

#     def __repr__(self):
#         return self.incident_id
    
#     def __str__(self):
#         return self.incident_id
