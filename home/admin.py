from django.contrib import admin
from .models import User
from .models import Contact, MissionArea
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin



@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (('Personal info'), {'fields': ('first_name', 'last_name','avatar')}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser','is_campuspartner', 'is_communitypartner',
                                       'groups', 'user_permissions')}),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_active',)
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)



class ContactList(admin.ModelAdmin):

    list_display = ('first_name', 'last_name', 'work_phone', 'cell_phone', 'email_id', 'contact_type','community_partner', 'campus_partner')

    search_fields = ('first_name', 'last_name', 'email_id', 'contact_type', 'community_partner', 'campus_partner')


class MissionAreaList(admin.ModelAdmin):

    list_display = ('mission_name', 'description')

    search_fields = ('mission_name', 'description')


# admin.site.register(User)
admin.site.register(Contact,ContactList)
admin.site.register(MissionArea,MissionAreaList)

