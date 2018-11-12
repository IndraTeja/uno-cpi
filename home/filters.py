import django_filters
from projects.models import Project, EngagementType, ActivityType, Status, ProjectCampusPartner, \
    ProjectCommunityPartner, ProjectMission
from partners.models import CommunityPartner


class ProjectFilter(django_filters.FilterSet):

    class Meta:
        model = Project
        fields = ['academic_year', 'engagement_type', ]


class ProjectMissionFilter(django_filters.FilterSet):

    class Meta:
        model = ProjectMission
        fields = ['mission', ]


class AcademicYearFilter(django_filters.FilterSet):

    class Meta:
        model = Project
        fields = ['academic_year', ]


class ProjectCampusFilter(django_filters.FilterSet):

    class Meta:
        model = ProjectCampusPartner
        fields = ['campus_partner', ]


class communityPartnerFilter(django_filters.FilterSet):

    class Meta:
        model = CommunityPartner
        fields = ["weitz_cec_part"]

