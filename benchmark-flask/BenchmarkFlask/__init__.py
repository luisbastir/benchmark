from flask import Flask
from .db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://admin:1234abcde@127.0.0.1/db_flask"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


import BenchmarkFlask.routing
import BenchmarkFlask.modelview