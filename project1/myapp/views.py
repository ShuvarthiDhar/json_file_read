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
    # try:
    #     data = paginator.page(page)
    # except PageNotAnInteger:
    #     data = paginator.page(1)
    # except EmptyPage:
    #     data = paginator.page(paginator.num_pages)
    context = {'data': data}
    return render(request, 'myapp/word_token.html', context)


def embedded_word_token(request):
    search_data=request.GET.get('word')
    json_file = settings.embedded_word_token_file
    f = open(json_file, )
    read_data = json.load(f)
    data = list()
    for k, v in read_data.items():
        cbow_value=''
        skip_value=''
        glove_value=''
        for ky, value in v.items():
            for key, val in value.items():
                if ky=='cbow':
                    cbow_value += str(key) + ',\t\n' #str(key) +' ('+ str(val) +') , \n'
                if ky=='skip':
                    skip_value += str(key) + ',\t\n'#str(key) +' ('+ str(val) +') , \n'

                if ky=='glove':
                    glove_value += str(key) + ',\t\n' #str(key) +' ('+ str(val) +') , \n'

        data.append({'key': k, 'cbow': cbow_value, 'skip':skip_value, 'glove':glove_value})
    if search_data:
        search_data_list=[]
        for word_data in data:
            if search_data in word_data['key']:
                search_data_list.append(word_data)
        data=search_data_list

    page = request.GET.get('page', 1)

    # paginator = Paginator(data, 100)
    # try:
    #     data = paginator.page(page)
    # except PageNotAnInteger:
    #     data = paginator.page(1)
    # except EmptyPage:
    #     data = paginator.page(paginator.num_pages)
    context = {'data': data}
    return render(request, 'myapp/embedded_word_token.html', context)
