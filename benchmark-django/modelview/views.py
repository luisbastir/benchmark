from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from .models import Author, Book
from .forms import AuthorForm, BookForm

# Create your views here.

# GET /modelview/authors
def modelview_authors(request):
  authors = Author.objects.all()
  return render(request, "modelview/authors/index.html", {"authors": authors})

# GET-POST /modelview/authors/new
def modelview_author_new(request):
  if request.method == "POST":
    form = AuthorForm(request.POST)
    if form.is_valid():
      first = form.cleaned_data["first_name"]
      last = form.cleaned_data["last_name"]
      author = Author(first_name=first, last_name=last)
      author.save()
      return HttpResponseRedirect("/modelview/authors/%s/" % author.id)

  form = AuthorForm()
  return render(request, "modelview/authors/new.html", {"form": form})
  
# GET-POST /modelview/authors/:id
def modelview_author(request, id):
  author = Author.objects.get(pk=id)
  books = Book.objects.filter(author_id=author.id)
  if request.method == "POST":
    form = AuthorForm(request.POST)
    if form.is_valid():
      author.first_name = form.cleaned_data["first_name"]
      author.last_name = form.cleaned_data["last_name"]
      author.save()
  
  form = AuthorForm(instance=author)
  return render(request, "modelview/authors/edit.html", {"form": form, "books": books, 'author': author})

# POST /modelview/authors/:id/delete
def modelview_author_delete(request, id):
  author = Author.objects.get(pk=id)
  author.delete()
  return HttpResponseRedirect("/modelview/authors")



# GET /modelview/books
def modelview_books(request):
  books = Book.objects.all()
  return render(request, "modelview/books/index.html", {"books": books})

# GET-POST /modelview/books/new
def modelview_book_new(request):
  if request.method == "POST":
    form = BookForm(request.POST)
    if form.is_valid():
      title = form.cleaned_data["title"]
      description = form.cleaned_data["description"]
      year = form.cleaned_data["year"]
      author = form.cleaned_data["author"]
      book = Book(title=title,description=description,year=year,author=author)
      book.save()
      return HttpResponseRedirect("/modelview/books/%s/" % book.id)

  form = BookForm()
  return render(request, "modelview/books/new.html", {"form": form})
  
# GET-POST /modelview/books/:id
def modelview_book(request, id):
  book = Book.objects.get(pk=id)
  if request.method == "POST":
    form = BookForm(request.POST, instance=book)
    if form.is_valid():
      book.title = form.cleaned_data["title"]
      book.description = form.cleaned_data["description"]
      book.year = form.cleaned_data["year"]
      book.author = form.cleaned_data["author"]
      book.save()
  
  form = BookForm(instance=book)
  return render(request, "modelview/books/edit.html", {"form": form, "book": book})

# POST /modelview/books/:id/delete
def modelview_book_delete(request, id):
  book = Book.objects.get(pk=id)
  book.delete()
  return HttpResponseRedirect("/modelview/books")