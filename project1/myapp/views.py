# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from project1 import settings


def word_token(request):
    json_file = settings.word_token_file
    f = open(json_file, )
    read_data = json.load(f)
    data = json.dumps(read_data, indent=4)

    return HttpResponse(data)


def embedded_word_token(request):
    json_file = settings.embedded_word_token_file
    f = open(json_file, )
    read_data = json.load(f)
    data = json.dumps(read_data, indent=4)

    return HttpResponse(data)