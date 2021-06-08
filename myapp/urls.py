from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^graph_vis/$',views.graph_vis,name="graph_vis"),
]