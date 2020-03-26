from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.

# GET /hello
def hello(request):
  return HttpResponse("Hello World!")

# GET /hello/json
def hello_json(request):
  msg = {'message': 'Hello World!'}
  return JsonResponse(msg)

# GET /hello/html
def hello_html(request):
  return render(request, "routings/hello.html")

# GET /hello/html/:msg
def hello_html_msg(request, msg):
  return render(request, "routings/hello_msg.html", {"msg": msg})

# GET /hello/msg/:msg
def hello_msg(request, msg):
  text = "Hello World! - " + msg
  return HttpResponse(text)

# GET /hello/query
def hello_query(request):
  param = request.GET.get("msg")
  msg = "Hello World! - " + param
  return HttpResponse(msg)

# GET /badrequest
def bad_request_method(request):
  return HttpResponse("Successful response!", status=400)

# GET /list
def list_method(request):
  text = ""
  for x in range(5001):
    text += "This is the line " + str(x) + "\n<br>"

  return HttpResponse(text)