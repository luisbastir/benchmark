from flask import render_template, jsonify, request, redirect, url_for
from BenchmarkFlask import app
from BenchmarkFlask.db import db
from BenchmarkFlask.models import Author, Book

# AUTHORS

@app.route("/modelview/authors")
def modelview_authors():
  authors = Author.query.all()
  return render_template("authors/index.html", authors=authors)

@app.route("/modelview/authors/new")
def modelview_author_new():
  return render_template("authors/new.html")

@app.route("/modelview/authors", methods=["POST"])
def modelview_author_create():
  first = request.form.get("first_name")
  last = request.form.get("last_name")
  author = Author(first_name=first, last_name=last)
  db.session.add(author)
  db.session.commit()
  return redirect(url_for("modelview_author", id=author.id))

@app.route("/modelview/authors/<int:id>")
def modelview_author(id):
  author = Author.query.filter_by(id=id).first()
  books = Book.query.filter_by(author_id=author.id).all()
  return render_template("authors/edit.html", author=author, books=books)

@app.route("/modelview/authors/<int:id>", methods=["PUT"])
@app.route("/modelview/authors/<int:id>/update", methods=["POST"])
def modelview_author_update(id):
  first = request.form.get("first_name")
  last = request.form.get("last_name")
  author = Author.query.filter_by(id=id).first()
  author.first_name = first
  author.last_name = last
  db.session.commit()
  return redirect(url_for("modelview_author", id=author.id))

@app.route("/modelview/authors/<int:id>", methods=["DELETE"])
@app.route("/modelview/authors/<int:id>/delete", methods=["POST"])
def modelview_author_delete(id):
  author = Author.query.filter_by(id=id).first()
  db.session.query(Book).filter(Book.author_id == author.id).delete(synchronize_session=False)
  db.session.delete(author)
  db.session.commit()
  return redirect(url_for("modelview_authors"))


# BOOKS

@app.route("/modelview/books")
def modelview_books():
  books = Book.query.all()
  return render_template("books/index.html", books=books)

@app.route("/modelview/books/new")
def modelview_book_new():
  authors=Author.query.all()
  return render_template("books/new.html", authors=authors)

@app.route("/modelview/books", methods=["POST"])
def modelview_book_create():
  title = request.form.get("title")
  description = request.form.get("description")
  year = request.form.get("year")
  author_id = request.form.get("author_id")
  book = Book(title=title, description=description, year=year, author_id=author_id)
  db.session.add(book)
  db.session.commit()
  return redirect(url_for("modelview_book", id=book.id))

@app.route("/modelview/books/<int:id>")
def modelview_book(id):
  book = Book.query.filter_by(id=id).first()
  authors=Author.query.all()
  return render_template("books/edit.html", book=book, authors=authors)

@app.route("/modelview/books/<int:id>", methods=["PUT"])
def modelview_book_update(id):
  title = request.form.get("title")
  description = request.form.get("description")
  year = request.form.get("year")
  author_id = request.form.get("author_id")
  book = Book.query.filter_by(id=id).first()
  book.title = title
  book.description = description
  book.year = year
  book.author_id = author_id
  db.session.commit()
  return redirect(url_for("modelview_book", id=book.id))

@app.route("/modelview/books/<int:id>", methods=["DELETE"])
def modelview_book_delete(id):
  book = Book.query.filter_by(id=id).first()
  db.session.delete(book)
  db.session.commit()
  return redirect(url_for("modelview_books"))