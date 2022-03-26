from rest_framework import serializers

from itincidents.models import ClosedIncident, RaisedIncident, BacklogIncident


class RaisedIncidentSerializer(serializers.ModelSerializer):
    # url = serializers.HyperlinkedIdentityField(view_name='raised-incident-detail')
    # department = serializers.HyperlinkedRelatedField(view_name='department-detail', read_only=True)

    class Meta:
        model = RaisedIncident
        fields = ['incident_id', 'priority', 'incident_type', 'department', 'incident_status', 'created_date', 'resolution_date']


class ClosedIncidentSerializer(serializers.ModelSerializer):
    # url = serializers.HyperlinkedIdentityField(view_name='closed-incident-detail')
    # department = serializers.HyperlinkedRelatedField(view_name='department-detail', read_only=True)

    class Meta:
        model = ClosedIncident
        fields = ['incident_id', 'priority', 'incident_type', 'department', 'incident_status', 'created_date', 'resolution_date']



class BacklogIncidentSerializer(serializers.ModelSerializer):
    # url = serializers.HyperlinkedIdentityField(view_name='backlog-incident-detail')
    # department = serializers.HyperlinkedRelatedField(view_name='department-detail', read_only=True)

    class Meta:
        model = BacklogIncident
        fields = ['incident_id', 'priority', 'incident_type', 'department', 'incident_status', 'created_date', 'resolution_date']
 