from .common import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-)a8x9l3_e5_wp1!br%(+mmm&w-78b(9(p8*l$lg3a0luh55j^0'


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True



DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql_psycopg2',
    #     'NAME': 'TIP',
    #     'USER': 'postgres',
    #     'PASSWORD': '262302',
    #     'HOST': 'localhost',
    #     'POST': '',
    # }
    'default':
    {
    'ENGINE':'django.db.backends.oracle',
    'NAME':'tipdb_high',
    'USER':'Admin', 
    'PASSWORD':'54515IEtip!54515',
    }
    # 'default':
    # {
    # 'ENGINE':'django.db.backends.mysql',
    # 'NAME':'tipdb',
    # 'USER':'admin', 
    # 'PASSWORD':'54515TIPDB',
    # 'HOST': 'tipdbmysql.cixfu5bysw3x.eu-central-1.rds.amazonaws.com',
   
    # }
}