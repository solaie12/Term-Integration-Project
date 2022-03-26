from django.urls import path,re_path
from . import views

from itincidents.load_excel import IncidentTablesViewSet
from itincidents.kpis_view import NumberOFIncidentsRaisedViewSet,NumberOFIncidentsRaisedByMonthViewSet, SLAPerSeverityViewSet,SLAPerSeverityMonthlyViewSet,NumberOFIncidentsRaisedByWeeklyViewSet,IncidentsTypeRaisedViewSet

urlpatterns = [
    path('hello/',views.say_hello),
    path('insert/', IncidentTablesViewSet.as_view(), name='insert_incident'),
 
   
    re_path(r'weekly/(?P<type>\d)/$', NumberOFIncidentsRaisedByWeeklyViewSet.as_view(), name='incidentsByWeekly'),

    re_path(r'monthly/incidentType/(?P<year>\d+)/(?P<month>\d+)/$', IncidentsTypeRaisedViewSet.as_view(), name='incidentsType'),

    re_path(r'monthly/(?P<type>\d)/$', NumberOFIncidentsRaisedByMonthViewSet.as_view(), name='incidentsByMonth'),
    re_path(r'kpi/num_incident/(?P<year>\d+)/(?P<month>\d+)/$', NumberOFIncidentsRaisedViewSet.as_view(), name='num_incident_kpi'),
    re_path(r'kpi/SLA/(?P<year>\d+)/(?P<month>\d+)/$', SLAPerSeverityViewSet.as_view(), name='kpi_sla'),
    re_path(r'kpi/SLA/', SLAPerSeverityMonthlyViewSet.as_view(), name='kpi_sla_month'),


]

