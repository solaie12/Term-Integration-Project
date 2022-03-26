
from textwrap import indent
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status
from django.db.models import Count
from django.core.serializers import serialize
 

from itincidents.models import RaisedIncident, BacklogIncident, ClosedIncident
from itincidents.serializers import RaisedIncidentSerializer


class NumberOFIncidentsRaisedViewSet(ListAPIView):

    def get(self, request, *args, **kwargs):
        try:
            year = kwargs['year']
            month = kwargs['month']

            raised_incidents = RaisedIncident.objects.all()
            low_severity = RaisedIncidentSerializer(raised_incidents.filter(
                priority="Baja", created_date__year=year, created_date__month=month), context={"request": request}, many=True)
            medium_severity = RaisedIncidentSerializer(raised_incidents.filter(
                priority="Media", created_date__year=year, created_date__month=month), context={"request": request}, many=True)
            high_severity = RaisedIncidentSerializer(raised_incidents.filter(
                priority="Alta", created_date__year=year, created_date__month=month), context={"request": request}, many=True)
            critical_severity = RaisedIncidentSerializer(raised_incidents.filter(
                priority="Crítica", created_date__year=year, created_date__month=month), context={"request": request}, many=True)

            resp = {
                "critical":  len(critical_severity.data),
                "medium": len(medium_severity.data),
                "high":  len(high_severity.data),
                "low":   len(low_severity.data),
                }

            return Response(data=resp, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(data={'message': "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class IncidentsTypeRaisedViewSet(ListAPIView):

    def get(self, request, *args, **kwargs):
        try:
            year = kwargs['year']
            month = kwargs['month']

            raised_incidents = RaisedIncident.objects.values('incident_type').annotate(count=Count(
                'incident_type')).filter(created_date__month=month).order_by('count').reverse()

            return Response(data=raised_incidents, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(data={'message': "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NumberOFIncidentsRaisedByMonthViewSet(ListAPIView):

    def get(self, request, *args, **kwargs):
        try:

            type = kwargs['type']
 
            raised_incidents = RaisedIncident.objects.values(
                'created_date__month').annotate(count=Count('created_date__month'))

            if type == '0':
         
                 raised_incidents = RaisedIncident.objects.values('created_date__month').annotate(
                     count=Count('created_date__month')).order_by('created_date__month').reverse()

            elif type == '1':
                 raised_incidents = RaisedIncident.objects.values('created_date__month').annotate(count=Count(
                     'created_date__month')).filter(priority='Crítica').order_by('created_date__month').reverse()

            elif type == '2':
                 raised_incidents = RaisedIncident.objects.values('created_date__month').annotate(count=Count(
                     'created_date__month')).filter(priority='Media').order_by('created_date__month').reverse()

            elif type == '3':
                raised_incidents = RaisedIncident.objects.values('created_date__month').annotate(count=Count(
                    'created_date__month')).filter(priority='Alta').order_by('created_date__month').reverse()

            elif type == '4':
                 raised_incidents = RaisedIncident.objects.values('created_date__month').annotate(count=Count(
                     'created_date__month')).filter(priority='Baja').order_by('created_date__month').reverse()

            return Response(data=raised_incidents, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(data={'message': "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NumberOFIncidentsRaisedByWeeklyViewSet(ListAPIView):

    def get(self, request, *args, **kwargs):
        try:

            type = kwargs['type']

            raised_incidents = RaisedIncident.objects.values('created_date__week').annotate(count=Count(
                'created_date__week')).filter(priority='Baja').order_by('created_date__week').reverse()

            if type == '0':
           
                raised_incidents = RaisedIncident.objects.values('created_date__week').annotate(count=Count(
                    'created_date__week')).filter(priority='Baja').order_by('created_date__week').reverse()

            elif type == '1':
                   raised_incidents = RaisedIncident.objects.values('created_date__week').annotate(count=Count(
                       'created_date__week')).filter(priority='Crítica').order_by('created_date__week').reverse()

            elif type == '2':
                   raised_incidents = RaisedIncident.objects.values('created_date__week').annotate(count=Count(
                       'created_date__week')).filter(priority='Media').order_by('created_date__week').reverse()

            elif type == '3':
                   raised_incidents = RaisedIncident.objects.values('created_date__week').annotate(count=Count(
                       'created_date__week')).filter(priority='Alta').order_by('created_date__week').reverse()

            elif type == '4':
                   raised_incidents = RaisedIncident.objects.values('created_date__week').annotate(count=Count(
                       'created_date__week')).filter(priority='Baja').order_by('created_date__week').reverse()

            return Response(data=raised_incidents, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={'message': "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SLADailySeverityViewSet(ListAPIView):
 
    def get(self, request, *args, **kwargs):

        try:
            year = kwargs['year']
            month = kwargs['month']

            raised_incidents = RaisedIncident.objects.values('created_date__day').annotate(
                count=Count('created_date__day')).order_by('created_date__day').reverse()

            return Response(data=raised_incidents, status=status.HTTP_200_OK)
        except Exception as e:

            return Response(data={'message': f"Something went wrong!{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SLAPerSeverityViewSet(ListAPIView):
   
    def get(self, request, *args, **kwargs):
 
        try:
            sla = {
                "low": {
                    "in_sla": 0,
                    "out_sla": 0
                },
                "medium": {
                    "in_sla": 0,
                    "out_sla": 0
                },
                "high": {
                    "in_sla": 0,
                    "out_sla": 0
                },
                "critical": {
                    "in_sla": 0,
                    "out_sla": 0
                }
            }

            year = kwargs['year']
            month = kwargs['month']

            closed_incidents = ClosedIncident.objects.all()

            low_severity = closed_incidents.filter(
                priority="Baja", resolution_date__year=year, resolution_date__month=month)
            medium_severity = closed_incidents.filter(
                priority="Media", resolution_date__year=year, resolution_date__month=month)
            high_severity = closed_incidents.filter(
                priority="Alta", resolution_date__year=year, resolution_date__month=month)
            critical_severity = closed_incidents.filter(
                priority="Crítica", resolution_date__year=year, resolution_date__month=month)

            for low in low_severity:
                time_delta = low.resolution_date - low.created_date
                sla_time = 15 * 24
                time_to_resolve = time_delta.total_seconds() / 3600
                if time_to_resolve <= sla_time:
                    sla['low']['in_sla'] += 1
                else:
                    sla['low']['out_sla'] += 1

            for medium in medium_severity:
                time_delta = medium.resolution_date - medium.created_date
                sla_time = 5 * 24
                time_to_resolve = time_delta.total_seconds() / 3600
                if time_to_resolve <= sla_time:
                    sla['medium']['in_sla'] += 1
                else:
                    sla['medium']['out_sla'] += 1

            for high in high_severity:
                time_delta = high.resolution_date - high.created_date
                sla_time = 8
                time_to_resolve = time_delta.total_seconds() / 3600
                if time_to_resolve <= sla_time:
                    sla['high']['in_sla'] += 1
                else:
                    sla['high']['out_sla'] += 1

            for critical in critical_severity:
                time_delta = critical.resolution_date - critical.created_date
                sla_time = 4
                time_to_resolve = time_delta.total_seconds() / 3600
                if time_to_resolve <= sla_time:
                    sla['critical']['in_sla'] += 1
                else:
                    sla['critical']['out_sla'] += 1

            return Response(data=sla, status=status.HTTP_200_OK)
        except Exception as e:

            return Response(data={'message': f"Something went wrong!{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SLAPerSeverityMonthlyViewSet(ListAPIView):
   
    def getSingleMonthSLA(self, month, year):
        try:
            sla = {
                "low": {
                    "in_sla": 0,
                    "out_sla": 0
                },
                "medium": {
                    "in_sla": 0,
                    "out_sla": 0
                },
                "high": {
                    "in_sla": 0,
                    "out_sla": 0
                },
                "critical": {
                    "in_sla": 0,
                    "out_sla": 0
                }
            }

            slaStatus = {
                # "lowPercent": 0,
                # "mediumPercent": 0,
                # "highPercent":0 , 
                "criticalPercent":  0
            
            }

            closed_incidents = ClosedIncident.objects.all()

            low_severity = closed_incidents.filter(
                priority = "Baja", resolution_date__year = year, resolution_date__month = month)
            medium_severity=closed_incidents.filter(
                priority = "Media", resolution_date__year = year, resolution_date__month = month)
            high_severity=closed_incidents.filter(
                priority = "Alta", resolution_date__year = year, resolution_date__month = month)
            critical_severity=closed_incidents.filter(
                priority = "Crítica", resolution_date__year = year, resolution_date__month = month)
 
            for critical in critical_severity:
                time_delta=critical.resolution_date - critical.created_date
                sla_time=4
                time_to_resolve=time_delta.total_seconds() / 3600
                if time_to_resolve <= sla_time:
                    sla['critical']['in_sla'] += 1
                else:
                    sla['critical']['out_sla'] += 1
 
            criticalPercent = (sla["critical"]["in_sla"]/(sla["critical"]["in_sla"]+sla["critical"]["out_sla"]))*100
            
          
            return criticalPercent

        except Exception as e:

            return 35.2


    def get(self, request, *args, **kwargs):

        closed_months=ClosedIncident.objects.values(
            'resolution_date__month').annotate(count = Count('resolution_date__month'))

        try:

            all_slas = {1:{"criticalPercent":0},2:{"criticalPercent":0},3:{"criticalPercent":0},4:{"criticalPercent":0},5:{"criticalPercent":0},6:{"criticalPercent":0},7:{"criticalPercent":0},8:{"criticalPercent":0},9:{"criticalPercent":0},10:{"criticalPercent":0},11:{"criticalPercent":0},12:{"criticalPercent":0}}

            for i in range(1, closed_months[len(closed_months)-1]['resolution_date__month']+2):
         
               all_slas[i]["criticalPercent"] = str(self.getSingleMonthSLA(i, 2021))
 
            return Response(all_slas, status = status.HTTP_200_OK)

        except Exception as e:

            return Response(data = {'message': f"Something went wrong!{e}"}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
