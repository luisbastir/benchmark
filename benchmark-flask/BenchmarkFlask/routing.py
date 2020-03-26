from flask import render_template, jsonify, request
from BenchmarkFlask import app

@app.route("/hello")
def hello():
  return "Hello World!"

@app.route("/hello/json")
def hello_json():
  data = {'message': 'Hello World!'}
  return jsonify(data)

@app.route("/hello/html")
def html_method():
  msg = ""
  return render_template("hello.html", msg = msg)

@app.route("/hello/html/<msg>")
def html_msg_method(msg):
  return render_template("hello_msg.html", msg = msg)

@app.route("/hello/msg/<msg>")
def msg(msg):
  return "Hello World! - " + msg

@app.route("/hello/query")
def query_method():
  msg = request.args.get("msg")
  return "Hello World! - " + msg

@app.route("/badrequest")
def badrequest_method():
  return "Successful response!", 400

@app.route("/list")
def list_method():
  text = ""
  for i in range(5001):
    text += "This is the line " + str(i) + "\n<br>"

  return text