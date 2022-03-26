release: python manage.py migrate

web: gunicorn tipbackend.wsgi
worker: celery - A tipbackend worker