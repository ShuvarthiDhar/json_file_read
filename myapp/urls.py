from django.conf.urls import url
# from . import views
from .views import kg_render

urlpatterns = [
    # url(r'^graph_vis/$', kg_render.graph_vis, name="graph_vis"),
url(r'^graph_data/$', kg_render.graph_data, name='graph_vis_data'),
    url('graph_vis', kg_render.graph_vis, name="graph_vis"),


]