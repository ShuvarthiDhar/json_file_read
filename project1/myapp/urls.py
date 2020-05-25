from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^word_token/$',views.word_token),
    url(r'^embedded_word_token/$',views.embedded_word_token),
]