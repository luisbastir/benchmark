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
from modelview import views as modelview_views

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
  path('list/', routings_view.list_method),

  # modelview
  path('modelview/authors/', modelview_views.modelview_authors, name="modelview_authors"),
  path('modelview/authors/new/', modelview_views.modelview_author_new, name="modelview_author_new"),
  path('modelview/authors/<int:id>/', modelview_views.modelview_author, name="modelview_author"),
  path('modelview/authors/<int:id>/delete/', modelview_views.modelview_author_delete, name="modelview_author_delete"),

  path('modelview/books/', modelview_views.modelview_books, name="modelview_books"),
  path('modelview/books/new/', modelview_views.modelview_book_new, name="modelview_book_new"),
  path('modelview/books/<int:id>/', modelview_views.modelview_book, name="modelview_book"),
  path('modelview/books/<int:id>/delete/', modelview_views.modelview_book_delete, name="modelview_book_delete"),
]
