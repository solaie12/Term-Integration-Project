
from datetime import date, datetime
import pandas as pd
import csv
import os

from django.conf import settings
from itincidents.models import BacklogIncident, ClosedIncident, RaisedIncident


def clear_empty_rows(data, num_rows):
    return data.drop(range(num_rows))


def raised_incidents_excel_handler(filename):
    try:

        excel_file = pd.ExcelFile(filename)
        data = pd.read_excel(excel_file, sheet_name='MONTHLY INCIDENTS RAISED')

        headers = data.iloc[1]
        data = data[2:]
        data.columns = headers

        data = data[['Incidenct Code', 'Create Date-Time', 'Resolution Date-Time',
                     'Incident Status', 'Priority', 'Inc. Type', 'Departamento Cliente']]
        bulk_creator = []
        existing_incidents = RaisedIncident.objects.all(
        ).values_list('incident_id', flat=True)
        for idx, row in data.iterrows():
            if row['Incidenct Code'] in existing_incidents:
                continue
            code = None

            created = pd.to_datetime(
                row['Create Date-Time'], format='%d/%m/%Y %H:%M').tz_localize('UTC')
            resolved = pd.to_datetime(
                row['Resolution Date-Time'], format='%d/%m/%Y %H:%M').tz_localize('UTC')
            if pd.isna(created):
                created = None
            if pd.isna(resolved):
                resolved = None
            new_raised = RaisedIncident(incident_id=row['Incidenct Code'], priority=row['Priority'], incident_type=row['Inc. Type'],
                                        incident_status=row['Incident Status'], created_date=created, resolution_date=resolved)
            bulk_creator.append(new_raised)
        RaisedIncident.objects.bulk_create(bulk_creator)

        return "Upload Success"

    except Exception as e:

        return "File Upload Failed"


def closed_incidents_excel_handler(filename):
    try:
        excel_file = pd.ExcelFile(filename)
        data = pd.read_excel(excel_file, sheet_name='MONTHLY INCIDENTS CLOSED')

        headers = data.iloc[1]
        data = data[2:]
        data.columns = headers

        data = data[['Incidenct Code', 'Creation Date-Time', 'Resolution Date-Time',
                     'Incident Status', 'Priority', 'Inc. Type', 'Departamento Cliente']]
        bulk_creator = []
        existing_incidents = ClosedIncident.objects.all(
        ).values_list('incident_id', flat=True)
        for idx, row in data.iterrows():
            if row['Incidenct Code'] in existing_incidents:
                continue

            created = pd.to_datetime(
                row['Creation Date-Time'], format='%d/%m/%Y %H:%M').tz_localize('UTC')
            resolved = pd.to_datetime(
                row['Resolution Date-Time'], format='%d/%m/%Y %H:%M').tz_localize('UTC')
            if pd.isna(created):
                created = None
            if pd.isna(resolved):
                resolved = None
            new_closed = ClosedIncident(incident_id=row['Incidenct Code'], priority=row['Priority'], incident_type=row['Inc. Type'],
                                        incident_status=row['Incident Status'], created_date=created, resolution_date=resolved)
            bulk_creator.append(new_closed)
        ClosedIncident.objects.bulk_create(bulk_creator)

        return "Upload Success"

    except Exception as e:

        return "File Upload Failed"


def backlog_incidents_excel_handler(filename):

    try:
        excel_file = pd.ExcelFile(filename)
        data = pd.read_excel(excel_file, sheet_name='MONTHLY INCIDENTS BACKLOG')

        headers = data.iloc[1]
        data = data[2:]
        data.columns = headers

        data = data[['Incidenct Code', 'Creation Date-Time', 'Resolution Date-Time',
                     'Incident Status', 'Priority', 'Inc. Type', 'Departamento Cliente']]
        bulk_creator = []
        existing_incidents = BacklogIncident.objects.all(
        ).values_list('incident_id', flat=True)
        for idx, row in data.iterrows():
            if row['Incidenct Code'] in existing_incidents:
                continue

            created = pd.to_datetime(
                row['Creation Date-Time'], format='%d/%m/%Y %H:%M').tz_localize('UTC')
            resolved = pd.to_datetime(
                row['Resolution Date-Time'], format='%d/%m/%Y %H:%M').tz_localize('UTC')
            if pd.isna(created):
                created = None
            if pd.isna(resolved):
                resolved = None
            new_closed = BacklogIncident(incident_id=row['Incidenct Code'], priority=row['Priority'], incident_type=row['Inc. Type'],
                                         incident_status=row['Incident Status'], created_date=created, resolution_date=resolved)
            bulk_creator.append(new_closed)
        BacklogIncident.objects.bulk_create(bulk_creator)

        return "Upload Success"

    except Exception as e:

        return "Upload Failed"
