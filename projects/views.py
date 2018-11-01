from projects.models import *
from home.models import *
from partners.models import *
from itertools import chain
from .models import *
from django.shortcuts import render, get_object_or_404 , get_list_or_404
from django.utils import timezone
from  .forms import *
from django.forms import inlineformset_factory, modelformset_factory



def communitypartnerhome(request):
    usertype = User.objects.get(is_communitypartner=True)
#    print(usertype.is_communitypartner)
#    if usertype.is_communitypartner == True:
    return render(request, 'community_partner_home.html',
                  {'communitypartnerhome': communitypartnerhome,'usertype':usertype})


def communitypartnerproject(request):
    print(request.user.id)
    projects_list=[]
    comm_part_names=[]
    camp_part_names=[]
    total_project_hours = []
    # Get the campus partner id related to the user
    comm_part_user = CommunityPartnerUser.objects.filter(user_id = request.user.id)
    for c in comm_part_user:
        p =c.community_partner_id
        print(c.community_partner_id)
    # get all the project names base on the campus partner id
    proj_comm = list(ProjectCommunityPartner.objects.filter(community_partner_id = p))
    print(proj_comm)
    for f in proj_comm:
        print(f)
        k=list(Project.objects.filter(id = f.project_name_id))
        print(k)
        for x in k:
         projmisn = list(ProjectMission.objects.filter(project_name_id=x.id))
         cp = list(ProjectCommunityPartner.objects.filter(project_name_id=x.id))
         camp = list(ProjectCampusPartner.objects.filter(project_name_id=x.id))
         proj_cam_par = list(ProjectCampusPartner.objects.filter(project_name_id=x.id))
         for proj_cam_par in proj_cam_par:
            camp_part = CampusPartner.objects.get(id=proj_cam_par.campus_partner_id)

            camp_part_names.append(camp_part)
         list_comm_part_names = comm_part_names
         comm_part_names = []
         #total_project_hours += proj_cam_par.total_hours
         #print(total_project_hours)
         data = {'pk': x.pk, 'name': x.project_name, 'engagementType': x.engagement_type,
            'activityType': x.activity_type,
            'facilitator': x.facilitator, 'semester': x.semester, 'status': x.status,
            'startDate': x.start_date,
            'endDate': x.end_date, 'total_uno_students': x.total_uno_students,
            'total_uno_hours': x.total_uno_hours,
            'total_k12_students': x.total_k12_students, 'total_k12_hours': x.total_k12_hours,
            'total_uno_faculty': x.total_uno_faculty,
            'total_other_community_members': x.total_other_community_members, 'outcomes': x.outcomes,
            'total_economic_impact': x.total_economic_impact,'projmisn': projmisn, 'cp': cp, 'camp':camp, 'camp_part':list_comm_part_names
             }

         projects_list.append(data)



    return render(request, 'projects/community_partner_projects.html', {'project': projects_list})
def communitypartnerprojectedit(request,pk):

    mission_edit_details = inlineformset_factory(Project, ProjectMission, extra=0, form=ProjectMissionForm)
    proj_comm_part = inlineformset_factory(Project, ProjectCommunityPartner, extra=0, can_delete=False,
                                           form=ProjectCommunityPartnerForm)
    projects_list = []
    comm_part_names = []
    if request.method == 'POST':
        proj_edit = Project.objects.filter(id=pk)
        for x in proj_edit:
            project = ProjectForm(request.POST or None, instance=x)

        mission_form = mission_edit_details(request.POST, request.FILES, instance=x)
        comp_proj_form = proj_comm_part(request.POST, request.FILES, instance=x)

        if project.is_valid()  \
                and comp_proj_form.is_valid():

            instances = project.save()
            commpar = comp_proj_form.save(commit=False)

            for p in commpar:
                p.project = instances
                p.save()
            comm_part_user = CommunityPartnerUser.objects.filter(user_id=request.user.id)
            for c in comm_part_user:
                p = c.community_partner_id
                print(c.community_partner_id)
            proj_comm = list(ProjectCommunityPartner.objects.filter(community_partner_id=p))
            print(proj_comm)
            for f in proj_comm:
                print(f)
                k = list(Project.objects.filter(id=f.project_name_id))
                print(k)
                for x in k:
                    projmisn = list(ProjectMission.objects.filter(project_name_id=x.id))
                    cp = list(ProjectCommunityPartner.objects.filter(project_name_id=x.id))
                    proj_comm_par = list(ProjectCommunityPartner.objects.filter(project_name_id=x.id))
                    for proj_comm_par in proj_comm_par:
                        comm_part = CommunityPartner.objects.get(id=proj_comm_par.community_partner_id)
                        # print("camp_part is")
                        # print(camp_part)
                        comm_part_names.append(comm_part)
                    list_comm_part_names = comm_part_names
                    comm_part_names = []

                    data = {'pk': x.pk, 'name': x.project_name, 'engagementType': x.engagement_type,
                            'activityType': x.activity_type,
                            'facilitator': x.facilitator, 'semester': x.semester, 'status': x.status,
                            'startDate': x.start_date,
                            'endDate': x.end_date, 'total_uno_students': x.total_uno_students,
                            'total_uno_hours': x.total_uno_hours,
                            'total_k12_students': x.total_k12_students, 'total_k12_hours': x.total_k12_hours,
                            'total_uno_faculty': x.total_uno_faculty,
                            'total_other_community_members': x.total_other_community_members, 'outcomes': x.outcomes,
                            'total_economic_impact': x.total_economic_impact, 'projmisn': projmisn, 'cp': cp,
                            'camp_part': list_comm_part_names
                            }

                    projects_list.append(data)

            return render(request, 'projects/community_partner_projects.html', {'project': projects_list})


    else:

        proj_edit = Project.objects.filter(id=pk)
        for x in proj_edit:
          project = ProjectForm(request.POST or None, instance=x)
        proj_mission = ProjectMission.objects.filter(project_name_id=pk)
        proj_comm_part_edit = ProjectCommunityPartner.objects.filter(project_name_id=pk)

        comp_proj_form = proj_comm_part(instance=x)

        return render(request, 'projects/community_partner_projects_edit.html', {'project':project,
                                                                                 'comp_proj_form': comp_proj_form})


def proj_view_user(request):
    #print(request.user.id)
    projects_list=[]
    camp_part_names=[]
    # Get the campus partner id related to the user
    camp_part_user = CampusPartnerUser.objects.filter(user_id = request.user.id)
    for c in camp_part_user:
        p =c.campus_partner_id
        #print(c)
    # get all the project names base on the campus partner id
    proj_camp = list(ProjectCampusPartner.objects.filter(campus_partner_id = p))

    for f in proj_camp:
        #print(l)
        k=list(Project.objects.filter(id = f.project_name_id))
        #print(k)
        for x in k:
         projmisn = list(ProjectMission.objects.filter(project_name_id=x.id))
         cp = list(ProjectCommunityPartner.objects.filter(project_name_id=x.id))
         proj_camp_par = list(ProjectCampusPartner.objects.filter(project_name_id=x.id))
         for proj_camp_par in proj_camp_par:
            camp_part = CampusPartner.objects.get(id=proj_camp_par.campus_partner_id)
            #print("camp_part is")
            #print(camp_part)
            camp_part_names.append(camp_part)
         list_camp_part_names = camp_part_names
         camp_part_names = []

         data = {'pk': x.pk, 'name': x.project_name, 'engagementType': x.engagement_type,
            'activityType': x.activity_type,
            'facilitator': x.facilitator, 'semester': x.semester, 'status': x.status,
            'startDate': x.start_date,
            'endDate': x.end_date, 'total_uno_students': x.total_uno_students,
            'total_uno_hours': x.total_uno_hours,
            'total_k12_students': x.total_k12_students, 'total_k12_hours': x.total_k12_hours,
            'total_uno_faculty': x.total_uno_faculty,
            'total_other_community_members': x.total_other_community_members, 'outcomes': x.outcomes,
            'total_economic_impact': x.total_economic_impact,'projmisn': projmisn, 'cp': cp, 'camp_part':list_camp_part_names
             }

         projects_list.append(data)



    return render(request, 'projects/Projectlist.html', {'project': projects_list})



def project_total_Add(request):
    mission_details = modelformset_factory(ProjectMission, extra =1 , form = ProjectMissionFormset)
    proj_comm_part= modelformset_factory(ProjectCommunityPartner, extra=1 , form =ProjectCommunityPartnerForm2)
    proj_campus_part=modelformset_factory(ProjectCampusPartner, extra=1, form=ProjectCampusPartnerForm)

    if request.method == 'POST':
        project = ProjectForm2(request.POST)
        formset = mission_details(request.POST or None)
        formset2 = proj_comm_part(request.POST or None)
        formset3 = proj_campus_part(request.POST or None)


        if project.is_valid() and formset.is_valid() and formset2.is_valid():
            proj= project.save()
            mission_form = formset.save(commit = False)
            proj_comm_form = formset2.save(commit= False)
            proj_campus_form = formset3.save(commit=False)

            for k in proj_comm_form:
                k.project_name = proj
                # print("in add comm")
                print(k.project_name)
                k.save()
            for form in mission_form:
                form.project_name = proj
                # print("in add mission")
                print(form.project_name)
                form.save()
            for c in proj_campus_form:
                c.project_name = proj
                # print("in add campus")
                print(c.project_name)
                c.save()

                project = Project.objects.filter(created_date__lte=timezone.now())
            projects_list = []

            for x in project:
                projmisn = list(ProjectMission.objects.filter(project_name_id=x.id))
                cp = list(ProjectCommunityPartner.objects.filter(project_name_id=x.id))
                camp_part = list(ProjectCampusPartner.objects.filter(project_name_id=x.id))

                data = {'pk': x.pk, 'name': x.project_name, 'engagementType': x.engagement_type,
                        'activityType': x.activity_type,
                        'facilitator': x.facilitator, 'semester': x.semester, 'status': x.status,
                        'startDate': x.start_date,
                        'endDate': x.end_date, 'total_uno_students': x.total_uno_students,
                        'total_uno_hours': x.total_uno_hours,
                        'total_k12_students': x.total_k12_students, 'total_k12_hours': x.total_k12_hours,
                        'total_uno_faculty': x.total_uno_faculty,
                        'total_other_community_members': x.total_other_community_members, 'outcomes': x.outcomes,
                        'total_economic_impact': x.total_economic_impact,
                        'projmisn': projmisn, 'cp': cp, 'camp_part': camp_part}
                projects_list.append(data)
            return render(request, 'projects/Projectlist.html', {'project':projects_list } )

    else:
        project = ProjectForm2()
        formset = mission_details(queryset=ProjectMission.objects.none())
        formset2 = proj_comm_part(queryset=ProjectCommunityPartner.objects.none())
        formset3 = proj_campus_part(queryset=ProjectCampusPartner.objects.none())
    return render(request,
                          'projects/project_add.html',{'project': project, 'formset': formset, 'formset2':formset2, 'formset3': formset3})


def project_edit_new(request,pk):

    mission_edit_details = inlineformset_factory(Project,ProjectMission, extra=0, form=ProjectMissionFormset)
    proj_comm_part_edit = inlineformset_factory(Project,ProjectCommunityPartner, extra=0, form=ProjectCommunityPartnerForm2)
    proj_campus_part_edit = inlineformset_factory(Project,ProjectCampusPartner, extra=0, form=ProjectCampusPartnerForm)
    # print('print input to edit')
    # print(pk)
    # print(request)
    if request.method == 'POST':
        proj_edit = Project.objects.filter(id=pk)
        for x in proj_edit:
            project = ProjectForm2(request.POST or None, instance=x)
            #print("in for loop")
        formset_missiondetails = mission_edit_details(request.POST ,request.FILES, instance =x)
        formset_comm_details = proj_comm_part_edit(request.POST, request.FILES, instance=x)
        formset_camp_details = proj_campus_part_edit(request.POST, request.FILES, instance=x)

        if project.is_valid() and formset_missiondetails.is_valid() and formset_comm_details.is_valid() and formset_camp_details.is_valid():

            instances = project.save()
            pm = formset_missiondetails.save(commit=False)
            compar= formset_comm_details.save(commit=False)
            campar= formset_camp_details.save(commit=False)

            for k in pm:
                k.project_name = instances
                k.save()
            for p in compar:
                p.project_name= instances
                p.save()
            for l in campar:
                l.project_name= instances
                l.save()
            projects_list = []
            camp_part_names = []
            # Get the campus partner id related to the user
            camp_part_user = CampusPartnerUser.objects.filter(user_id=request.user.id)
            for c in camp_part_user:
                p = c.campus_partner_id
                # print(c)
            # get all the project names base on the campus partner id
            proj_camp = list(ProjectCampusPartner.objects.filter(campus_partner_id=p))
            # for proj_camp_par in proj_camp:
            #     #print(proj_camp_par)
            #     proj_all = list(ProjectCampusPartner.objects.filter(project_name_id = proj_camp_par.project_name_id).distinct('campus_partner_id'))
            #     print("111111")
            # for proj_all in proj_all:
            #     #print(proj_all.campus_partner_id)
            #     camp_part = list(CampusPartner.objects.filter(id =proj_all.campus_partner_id ))
            #     print(camp_part)

            for f in proj_camp:
                # l = f.project_name_id
                # print(l)
                k = list(Project.objects.filter(id=f.project_name_id))
                # print(k)
                for x in k:

                    projmisn = list(ProjectMission.objects.filter(project_name_id=x.id))
                    cp = list(ProjectCommunityPartner.objects.filter(project_name_id=x.id))
                    proj_camp_par = list(ProjectCampusPartner.objects.filter(project_name_id=x.id))
                    for proj_camp_par in proj_camp_par:
                        camp_part = CampusPartner.objects.get(id=proj_camp_par.campus_partner_id)

                        camp_part_names.append(camp_part)
                    list_camp_part_names = camp_part_names
                    camp_part_names = []

                    data = {'pk': x.pk, 'name': x.project_name, 'engagementType': x.engagement_type,
                            'activityType': x.activity_type,
                            'facilitator': x.facilitator, 'semester': x.semester, 'status': x.status,
                            'startDate': x.start_date,
                            'endDate': x.end_date, 'total_uno_students': x.total_uno_students,
                            'total_uno_hours': x.total_uno_hours,
                            'total_k12_students': x.total_k12_students, 'total_k12_hours': x.total_k12_hours,
                            'total_uno_faculty': x.total_uno_faculty,
                            'total_other_community_members': x.total_other_community_members, 'outcomes': x.outcomes,
                            'total_economic_impact': x.total_economic_impact, 'projmisn': projmisn, 'cp': cp,
                            'camp_part': list_camp_part_names
                            }

                    projects_list.append(data)

            return render(request, 'projects/Projectlist.html', {'project': projects_list})

    else:
        #print(" Project_edit_new else")
        proj_edit = Project.objects.filter(id=pk)
        for x in proj_edit:
            project = ProjectForm2(request.POST or None, instance=x)
        proj_mission = ProjectMission.objects.filter(project_name_id=pk)
        proj_comm_part = ProjectCommunityPartner.objects.filter(project_name_id = pk)
        proj_camp_part = ProjectCampusPartner.objects.filter(project_name_id = pk)
        formset_missiondetails = mission_edit_details(instance=x)
        formset_comm_details = proj_comm_part_edit(instance=x)
        formset_camp_details = proj_campus_part_edit(instance=x)

        return render(request,'projects/project_edit.html',{'project': project,
                                               'formset_missiondetails':formset_missiondetails,
                                               'formset_comm_details': formset_comm_details,
                                               'formset_camp_details':formset_camp_details})
