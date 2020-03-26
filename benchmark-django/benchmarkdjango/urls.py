"""benchmarkdjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from routings import views as routings_view

urlpatterns = [
  path('admin/', admin.site.urls),

  # routing
  path('hello/', routings_view.hello),
  path('hello/json/', routings_view.hello_json),
  path('hello/html/', routings_view.hello_html),
  path('hello/html/<str:msg>/', routings_view.hello_html_msg),
  path('hello/msg/<str:msg>/', routings_view.hello_msg),
  path('hello/query/', routings_view.hello_query),
  path('badrequest/', routings_view.bad_request_method),
  path('list/', routings_view.list_method)
]
