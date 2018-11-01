from django.utils import timezone
from django.db import models


class Project (models.Model):
    project_name = models.CharField(max_length=255, unique=True)
    engagement_type = models.ForeignKey('EngagementType', on_delete=models.CASCADE, null=True)
    activity_type = models.ForeignKey('ActivityType', on_delete=models.CASCADE, null=True)
    facilitator = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    semester = models.CharField(max_length=255)
    total_uno_students = models.IntegerField()
    total_uno_hours = models.IntegerField()
    total_k12_students = models.IntegerField(null=True, blank=False)
    total_k12_hours = models.IntegerField()
    total_uno_faculty = models.IntegerField(blank=True, null=True)
    total_other_community_members = models.IntegerField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    other_details = models.CharField(max_length=100, null=True, blank=True)
    outcomes = models.CharField(max_length=100, null=True, blank=True)
    status = models.ForeignKey('Status', on_delete=models.CASCADE, null=True)
    total_economic_impact = models.DecimalField(max_digits=15, decimal_places=4, null=True, blank=True)
    address_line1 = models.CharField(max_length=1024, blank=True, null=True)
    address_line2 = models.CharField(max_length=1024, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=25, blank=True, null=True)
    state = models.CharField(max_length=15, blank=True, null=True)
    zip = models.IntegerField(null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(auto_now_add=True)

    def created(self):
        self.created_date = timezone.now()
        self.save()

    def updated(self):
        self.updated_date = timezone.now()
        self.save()


    def __str__(self):
        return str(self.project_name)


class ProjectMission (models.Model):
    mission_choices = (
        ('Primary', 'Primary'),
        ('Secondary', 'Secondary'),
        ('Other', 'Other'),
    )
    project_name = models.ForeignKey(Project, on_delete=models.CASCADE)
    mission_type = models.CharField(max_length=20,choices=mission_choices)
    mission = models.ForeignKey('home.MissionArea', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.mission)


class ProjectCommunityPartner (models.Model):
    project_name = models.ForeignKey('projects.Project',  on_delete=models.CASCADE)
    community_partner = models.ForeignKey('partners.CommunityPartner', on_delete=models.CASCADE)
    total_hours = models.IntegerField(blank=True,null=True)
    total_people = models.IntegerField(blank=True,null=True)
    wages = models.IntegerField(default=22)

    def __str__(self):
        return str(self.project_name)


class ProjectCampusPartner (models.Model):
    project_name = models.ForeignKey('projects.Project',  on_delete=models.CASCADE)
    campus_partner = models.ForeignKey('partners.CampusPartner', on_delete=models.CASCADE)
    total_hours = models.IntegerField(blank=True,null=True)
    total_people = models.IntegerField(blank=True,null=True)
    wages = models.IntegerField(blank=True,null=True)

    def __str__(self):
        return str(self.project_name)


class Status(models.Model):
    name = models.CharField(max_length=80, unique=True)
    description = models.CharField(max_length=255 , unique=True)

    def __str__(self):
        return str(self.name)


class EngagementType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)


class ActivityType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)
