from email.mime.image import MIMEImage
from pathlib import Path
from django.core.mail import send_mail, EmailMessage, send_mass_mail
from django.contrib.auth import get_user_model
import string
import datetime
import random
from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
import os
from django.conf import settings
from xhtml2pdf import pisa
from django.contrib.staticfiles import finders
from django.core import management
from django_cron import CronJobBase, Schedule


class Backup(CronJobBase):
    RUN_AT_TIMES = ['08:59','08:60']
    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = 'App.Backup'

    def __init__(self):
        directory = settings.DBBACKUP_STORAGE_OPTIONS['location']
        if not os.path.exists(directory):
            os.makedirs(directory)

    def do(self):
        management.call_command('dbbackup')
        management.call_command('mediabackup')

def link_callback(uri, rel):
    """
    Convert HTML URIs to absolute system paths so xhtml2pdf can access those
    resources
    """
    result = finders.find(uri)
    if result:
        if not isinstance(result, (list, tuple)):
            result = [result]
        result = list(os.path.realpath(path) for path in result)
        path = result[0]
    else:
        sUrl = settings.STATIC_URL  # Typically /static/
        sRoot = settings.STATIC_ROOT      # Typically /home/userX/project_static/
        mUrl = settings.MEDIA_URL         # Typically /media/
        mRoot = settings.MEDIA_ROOT       # Typically /home/userX/project_static/media/

        if uri.startswith(mUrl):
            path = os.path.join(mRoot, uri.replace(mUrl, ""))
        elif uri.startswith(sUrl):
            path = os.path.join(sRoot, uri.replace(sUrl, ""))
        else:
            return uri

    # make sure that file exists
    if not os.path.isfile(path):
        raise Exception(
            'media URI must start with %s or %s' % (sUrl, mUrl)
        )
    return path


def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result,)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None

