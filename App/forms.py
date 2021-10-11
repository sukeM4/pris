from PIL import Image
from django import forms
from django.core.files import File
from .models import Exam, Hierarchy, ChartOfAccounts
from django.contrib.auth import get_user_model
User = get_user_model()
class PhotoForm(forms.ModelForm):
    # x = forms.FloatField()
    # y = forms.FloatField()
    # width = forms.FloatField()
    # height = forms.FloatField()

    class Meta:
        model = User
        fields = ['photo']

    # def save(self):
    #     img = super(PhotoForm, self).save()

    #     x = self.cleaned_data.get('x')
    #     y = self.cleaned_data.get('y')
    #     w = self.cleaned_data.get('width')
    #     h = self.cleaned_data.get('height')

    #     image = Image.open(img.photo)
    #     cropped_image = image.crop((x, y, w+x, h+y))
    #     resized_image = image.resize((200, 200), Image.ANTIALIAS)
    #     resized_image.save(img.photo.path)

    #     return img

class ExamForm(forms.ModelForm):
    class Meta:
        model = Exam
        fields = ['exam_file']


class H(forms.ModelForm):
    class Meta:
        model = Hierarchy
        fields = '__all__'


class ChartOfAccountsForm(forms.ModelForm):
    class Meta:
        model = ChartOfAccounts
        fields = '__all__'
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key, value in self.fields.items():
            value.widget.attrs.update({'class': 'form-control',})
            if key == 'amount':
                value.widget = forms.HiddenInput()