from django.utils import timezone
from datetime import datetime
from django.conf import settings
import random
import datetime
import string
from django.contrib.auth import get_user_model
from .models import Journal
from django.core.mail import send_mail, EmailMessage, send_mass_mail
from pathlib import Path
from email.mime.image import MIMEImage
from django.db.models import Q
User = get_user_model()


def admission_number_func(value, value2):
    yr = int(value.year) - 2000
    if value2 == 'EMP':
        counter = User.objects.filter(Q(username__startswith=yr) & Q(is_employee=True)).count()
        counter += 1
        cnt = str(counter).zfill(2)

    elif value2 == 'PUP':
        counter = User.objects.filter(Q(username__startswith=yr) & Q(is_pupil=True) ).count()
        counter += 1
   
        cnt = str(counter).zfill(3)
    return f"{yr}{cnt}"


def password_func():
    letters_and_digits = string.ascii_letters + string.digits + string.punctuation
    rand_str = ''.join(random.choice(letters_and_digits) for i in range(9))
    return rand_str


def doc_no_func(doc_type):
    if doc_type == 'payment':
        counter = Journal.objects.filter(doc_no__startswith='PV').count()
        counter += 1
        val = 'PV'

    elif doc_type == 'invoice':
        counter = Journal.objects.filter(doc_no__startswith='INV').count()
        counter += 1
        val = 'INV'

    elif doc_type == 'receipts':
        counter = Journal.objects.filter(doc_no__startswith='REC').count()
        counter += 1
        val = 'REC'
    try:
        cnt = str(counter).zfill(4)
        return f'{val}/MLN/{cnt}'
    except:
        pass



def percent(a, b):
    return round((a / b) * 100)


def myemail():
    image_path = 'C:\\Users\\public.DESKTOP-2IG0C8O\\Desktop\\pris\\Pris\\App\\static\\pris\\malenlogo.jpg'
    image_name = Path(image_path).name
    subject = "hello"

    message = f"""
    <!DOCTYPE html>
    <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body
            style="background-color: #f8f9fa; ">
            <div style="padding: 10px; border-radius: 2px; max-width: 700px; margin: auto; font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; background-color: white;">
                <div>
                    <center>

                        <img src="cid:{image_name}" alt="" style="width:40%; max-width:100px ;">
                        <h3 style=" color: black;">MALEN PRE AND PRIMARY SCHOOL</h3>

                    </center>
                </div>
                <div>
                    <h4><span style="color:gray">Name:</span><span style="font-size: large; color: black;"> DUMMY NAME NOTHING </span></h4>
                    <h4><span style="color:gray">Date Issued:</span> <span style="color: black;"><strong> 10 Jan 2018</strong></span></h4>
                    <h4><span style="color:gray">Invoice No: </span> <span style="color: black;"><strong>4556</strong></span></h4>
                </div>
                <div>
                    <p style="color:gray">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non obcaecati quia porro possimus commodi
                        dolor! In
                        optio
                        minus quis nisi voluptate! Exercitationem optio dolores ipsam maiores obcaecati voluptatibus
                        dignissimos rem.
                    </p>
                    <p style="color:gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi blanditiis rem corrupti ad dolore
                        totam
                        facilis iure,
                        quibusdam ipsa natus tenetur nihil, animi ab officiis tempore fuga, beatae qui ut.</p>
                    <p style="color:gray">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit dignissimos corporis magnam
                        doloremque sequi odit
                        sapiente. Maiores, iure mollitia provident debitis voluptatibus ipsa illum, ab, totam eaque libero
                        necessitatibus
                        cupiditate?</p>
                </div>
                <div>
                    <table style="border: 0; width:100%;">
                        <thead>
                            <tr style="background-color: #f8f9fa; color: black;">
                                <th>Description</th>
                                <th>Rate</th>
                                <th>Hours</th>
                                <th>Sale</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr style="color: gray; border-bottom: 2px solid gray;">
                                <td>Description</td>
                                <td>Rate</td>
                                <td>Hours</td>
                                <td>Sale</td>
                            </tr>
                            <tr style="color: gray;">
                                <td>Description</td>
                                <td>Rate</td>
                                <td>Hours</td>
                                <td>Sale</td>
                            </tr>
                            <tr style="color: gray;">
                                <td>Description</td>
                                <td>Rate</td>
                                <td>Hours</td>
                                <td>Sale</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>hry</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

        </body>

    </html>

            """
    email = EmailMessage("Title", message, [], [], [
        "mmbosela@gmail.com"])
    email.content_subtype = "html"
    email.mixed_subtype = "related"
    with open(image_path, mode="rb") as f:
        image = MIMEImage(f.read())
        email.attach(image)
        image.add_header("Content-ID", f"<{image_name}>")
        email.send()
