from django import forms
from django.core.files.images import get_image_dimensions
from django.forms import ModelForm
from home.models import Contact, User, MissionArea
from partners.models import *
from university.models import *
from django.forms import modelformset_factory
from django.core.exceptions import NON_FIELD_ERRORS
from django.forms import inlineformset_factory

class CampusPartnerForm(forms.ModelForm):
    department = forms.ModelChoiceField(queryset=Department.objects, empty_label='Select Department')
    class Meta:
        model = CampusPartner
        fields = ('name', 'college_name', 'department',)
        exclude = ('education_system','university',)

        labels= {
            'name': ('Campus Partner Name'),
            'college_name': ('College Name'),
             }

    def __init__(self, *args, **kwargs):
        super(CampusPartnerForm, self).__init__(*args, **kwargs)
        self.fields['college_name'].empty_label = " Select College"






class CampusPartnerContactForm(forms.ModelForm):

    class Meta:
        model= Contact
        fields =('first_name','last_name','work_phone','cell_phone','email_id','contact_type',)

        labels = {
            'first_name': ('Contact First Name'),
            'last_name': ('Contact Last Name'),
            'work_phone': ('Contact Work Phone#'),
            'cell_phone': ('Contact Cell Phone#'),
            'email_id': ('Contact Email'),
            'contact_type':('Contact Type'),
        }

        widgets = {'work_phone': forms.TextInput({'placeholder': '##########'}),
                   'cell_phone': forms.TextInput({'placeholder': '##########'}),
                   'email_id': forms.TextInput({'placeholder': '@abc.edu'}),
                   }



class CommunityPartnerForm(forms.ModelForm):
    community_type = forms.ModelChoiceField(queryset=CommunityType.objects, empty_label='Select Community Type')
    class Meta:
        model = CommunityPartner
        fields = ('name', 'website_url', 'community_type', 'k12_level', 'address_line1', 'address_line2', 'country','county',
                  'city', 'state', 'zip')
        labels = {
            'community_type' : ('Community Type'),
        }
        widgets = {'name': forms.TextInput({'placeholder': 'Community Partner Name'}),
                   'website_url': forms.TextInput({'placeholder': 'https://www.unomaha.edu'}),
                   'k12_level' :forms.TextInput({'placeholder': 'If your community type is K12, Please provide the k12-level'}),
                   }



class CommunityContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ('first_name',
                  'last_name',
                  'work_phone',
                  'cell_phone',
                  'email_id',
                  'contact_type')
        labels = {
            'email_id': ('Contact Email'),
            'contact_type': ('Contact Type'),
        }
        widgets = {'work_phone': forms.TextInput({'placeholder': '##########'}),
                   'cell_phone': forms.TextInput({'placeholder': '##########'}),
                  }

    def validateEmail(email_id):
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError
        try:
            validate_email(email_id)
            return True
        except ValidationError:
            return False

class CommunityMissionForm(ModelForm):

    mission_choices = (
        ('Primary', 'Primary'),
        ('Secondary', 'Secondary'),
        ('Other', 'Other'),
    )

    mission_area = forms.ModelChoiceField(queryset=MissionArea.objects, empty_label='Select Mission Area')
    class Meta:
        model = CommunityPartnerMission
        fields = ('mission_type' , 'mission_area')
        labels = {
            'mission_type': ('Mission Type'),
            'mission_area': ('Mission Area'),
        }



