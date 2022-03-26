import os
from rest_framework.decorators import api_view
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.parsers import FileUploadParser

from core.import_excel import  backlog_incidents_excel_handler,closed_incidents_excel_handler,raised_incidents_excel_handler

from core.file_upload import UploadSerializer
 
class IncidentTablesViewSet(APIView):
   
    serializer_class = UploadSerializer
   
    def post(self, request, *args, **kwargs):
        
        try:

            print("d",request.FILES)
            file_uploaded = request.FILES.get('file_uploaded')
            print(file_uploaded)

            with open(file_uploaded.name, 'wb+') as f:
                for chunk in file_uploaded.chunks():
                    f.write(chunk)
            
            response_raised = raised_incidents_excel_handler(file_uploaded.name)
            response_backlog = backlog_incidents_excel_handler(file_uploaded.name)
            response_closed = closed_incidents_excel_handler(file_uploaded.name)

            if response_raised == 'Upload Successs':
       
                os.remove(file_uploaded.name)
                return Response(data={"message": "File uploaded and loaded succesfully"}, status=status.HTTP_200_OK)
            else:
                return Response(data={"message": "Loading data failed!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response(data={'message': f"Something went wrong! {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


