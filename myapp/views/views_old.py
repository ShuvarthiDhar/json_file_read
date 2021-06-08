# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json, os
from django.shortcuts import render, render_to_response
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from Django_configuration import settings

def parse_json_files():
    item_index_json = {}
    nodes = []

    kgEntity_folder = settings.kgEntity_dir
    kgEntity_list = os.listdir(kgEntity_folder)
    for kgEntFile in kgEntity_list:
        ent_f = open(os.path.join(kgEntity_folder, kgEntFile))
        ent_read_data = json.load(ent_f)
        i = 0
        for item_k, item_map in ent_read_data.items():
            if item_k not in item_index_json:
                item_index_json[item_k] = i
                i+=1
                nodes.append(item_map)

    kgRelation_folder = settings.kgRelation_dir
    kgRelation_list = os.listdir(kgRelation_folder)
    for kgRelFile in kgRelation_list:
        rel_f = open(os.path.join(kgRelation_folder, kgRelFile))
        rel_read_data = json.load(rel_f)
        for rel_map in rel_read_data:
            source_index = item_index_json[rel_map['_from']]
            target_index = item_index_json[rel_map['_to']]
            rel_map['source'] = source_index
            rel_map['target'] = target_index

    parsed_json = {'nodes': nodes, 'edges': rel_read_data}
    final_file = open(settings.kgFinal_file, "w")
    json.dump(parsed_json, final_file, indent=4)
    final_file.close()
    return parsed_json

def graph_vis(request):
    context = parse_json_files()
    dataset = { 'data': json.dumps(context) }
    return render(request, 'myapp/graph_vis.html', dataset)

# def word_token(request):
#     json_file = settings.word_token_file
#     f = open(json_file, )
#     read_data = json.load(f)
#     json_data = json.dumps(read_data, indent=4)
#     data=list()
#     for k, v in read_data.items():
#         data.append({'key':k,'value':v})
#     page = request.GET.get('page', 1)
#
#     paginator = Paginator(data, 100)
#     # try:
#     #     data = paginator.page(page)
#     # except PageNotAnInteger:
#     #     data = paginator.page(1)
#     # except EmptyPage:
#     #     data = paginator.page(paginator.num_pages)
#     context = {'data': data}
#     return render(request, 'myapp/word_token.html', context)
