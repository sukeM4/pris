from django import template
from num2words import num2words
import random
from django.db.models import Sum
from App.models import ChartOfAccounts
register = template.Library()

@register.filter
def unslugify(value):
    return value.replace('-', ' ')

@register.filter
def initials(value):
    return '.' + value[:1] + '.'


@register.filter
def removelist(value):
    v=''
    for i in value[:3]:
        v+=i
    return v

@register.filter
def shortsubject(value):
    w = value.split('-')
    v = ''
    z = 0
    if len(w) == 2:
        for i in w:
            if z + 1 < len(w):

                v += i[:1]
                z += 1
                v += '.'
            else:
                v+=i
        return v
    
    elif len(w) > 2:
        for i in w:

            v += i[:1]
            if z + 1 < len(w):

                v += '.'
            z += 1
        return v
    else:
        return value


@register.filter
def numb2words(value):
    return num2words(value)

@register.simple_tag
def randomint(a, b = None):
    if b is None:
        a, b = 0, a
    return random.randint(a, b)


@register.filter
def sumify(value1, value2):
    value = value1.children.all().aggregate(Sum(value2))[f'{value2}__sum']
    value1.amount = value
    value1.save()
    return value


@register.simple_tag
def mydr_sum(value1, value2):
    if value2 == ChartOfAccounts.objects.get(name__iexact='banks'):
        dr_sum = value1.filter(acc_no__parent=value2).aggregate(Sum('amount'))['amount__sum']
    else:
        dr_sum = value1.filter(acc_no=value2).aggregate(Sum('amount'))['amount__sum']

    if dr_sum == None:
        dr_sum = 0
    return dr_sum


@register.simple_tag
def mycr_sum(value1, value2):
    if value2 == ChartOfAccounts.objects.get(name__iexact='banks'):
        cr_sum = value1.filter(bal_acc_no__parent=value2).aggregate(Sum('amount'))['amount__sum']
    else:
        cr_sum = value1.filter(bal_acc_no=value2).aggregate(
            Sum('amount'))['amount__sum']

    if cr_sum == None:
        cr_sum = 0
    return cr_sum



@register.simple_tag
def mybalance(value1, value2, value3):
    # new_value1 = dr[:objs.index(value3)+1]
    if value2 == ChartOfAccounts.objects.get(name__iexact='banks'):
        # balance = 0
        # for bank in value2.children.all():
        dr_sum = value1.filter(acc_no__parent=value2, id__lte=value3.id).aggregate(
            Sum('amount'))['amount__sum']
        cr_sum = value1.filter(bal_acc_no__parent=value2, id__lte=value3.id).aggregate(
            Sum('amount'))['amount__sum']
        if dr_sum == None:
            dr_sum = 0
        if cr_sum == None:
            cr_sum = 0
        balance = dr_sum - cr_sum
    else:
        dr_sum = value1.filter(acc_no=value2, id__lte=value3.id).aggregate(Sum('amount'))['amount__sum']
        cr_sum = value1.filter(bal_acc_no=value2, id__lte=value3.id).aggregate(
            Sum('amount'))['amount__sum']
        if dr_sum == None:
                dr_sum = 0
        if cr_sum == None:
            cr_sum = 0
        balance = dr_sum - cr_sum
    return balance

@register.filter
def dashify(value, value1,):
    try:
        return value.replace(value1, '-')
    except:
        return value
