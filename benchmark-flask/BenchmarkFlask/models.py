from BenchmarkFlask.db import db

class Author(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(256), nullable=False)
  last_name = db.Column(db.String(256), nullable=False)
  books = db.relationship("Book", backref="author", lazy=True)

class Book(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(256), nullable=False)
  description = db.Column(db.String(256), nullable=False)
  year = db.Column(db.Integer, nullable=False)
  author_id = db.Column(db.Integer, db.ForeignKey("author.id"), nullable=False)