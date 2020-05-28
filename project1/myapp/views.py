# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django.shortcuts import render, render_to_response


from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from project1 import settings


def word_token(request):
    json_file = settings.word_token_file
    f = open(json_file, )
    read_data = json.load(f)
    json_data = json.dumps(read_data, indent=4)
    data=list()
    for k, v in read_data.items():
        data.append({'key':k,'value':v})
    page = request.GET.get('page', 1)

    paginator = Paginator(data, 100)
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)
    context = {'data': data}
    return render(request, 'myapp/word_token.html', context)


def embedded_word_token(request):
    json_file = settings.embedded_word_token_file
    f = open(json_file, )
    read_data = json.load(f)
    data = list()
    for k, v in read_data.items():
        cbow_5_value=''
        skip_5_value=''
        glove_5_value=''
        for ky, value in v.items():
            for key, val in value.items():
                if ky=='cbow_5':
                    cbow_5_value += str(key) +' ('+ str(val) +') , \n'
                if ky=='skip_5':
                    skip_5_value += str(key) +' ('+ str(val) +') , \n'

                if ky=='glove_5':
                    glove_5_value += str(key) +' ('+ str(val) +') , \n'

        data.append({'key': k, 'cbow_5': cbow_5_value,'skip_5':skip_5_value,'glove_5':glove_5_value})
    page = request.GET.get('page', 1)

    paginator = Paginator(data, 100)
    try:
        data = paginator.page(page)
    except PageNotAnInteger:
        data = paginator.page(1)
    except EmptyPage:
        data = paginator.page(paginator.num_pages)
    context = {'data': data}
    return render(request, 'myapp/embedded_word_token.html', context)
