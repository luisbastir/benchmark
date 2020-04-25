from django.db import models


class Author(models.Model):
  first_name = models.CharField(max_length=255)
  last_name = models.CharField(max_length=255)

  def __str__(self):
    return "%s %s" % (self.first_name, self.last_name)


class Book(models.Model):
  title = models.CharField(max_length=255)
  description = models.CharField(max_length=255)
  year = models.IntegerField()
  author = models.ForeignKey(Author, on_delete=models.CASCADE)