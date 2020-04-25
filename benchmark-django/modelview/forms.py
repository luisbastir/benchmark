from django import forms
from .models import Author, Book

class AuthorForm(forms.ModelForm):
  class Meta:
    model = Author
    fields = ["first_name", "last_name"]

class BookForm(forms.ModelForm):
  # author = forms.ModelChoiceField(queryset=Author.objects.all(), required=True)
  class Meta:
    model = Book
    fields = ["title", "description", "year", "author"]