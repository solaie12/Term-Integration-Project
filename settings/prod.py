import os

from .common import *
import dj_database_url

SECRET_KEY = os.environ['SECRET_KEY']

DEBUG = True



ALLOWED_HOSTS = ['tip-iberia-project.herokuapp.com']


DATABASES = {

  
    # 'default': dj_database_url.config()
    # {
    # 'ENGINE':'django.db.backends.oracle',
    # 'NAME':'tipdb_high',
    # 'USER':'Admin', 
    # 'PASSWORD':'54515IEtip!54515',
    # }
    'default':
    {
    'ENGINE':'django.db.backends.mysql',
    'NAME':'tipdb',
    'USER':'admin', 
    'PASSWORD':'54515TIPDB',
    'HOST': 'tipdbmysql.cixfu5bysw3x.eu-central-1.rds.amazonaws.com',
   
    }
    
}

# 3o-59d_k0$(-z(v*=7kd+^bxm^tk6k(gkxo2ztlub8*d&10%^u