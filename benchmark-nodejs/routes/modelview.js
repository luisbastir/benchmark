// Router Middleware
const express = require("express");
const router = express.Router();
const path = require("path");

const AuthorModel = require("../models/author");
const BookModel = require("../models/book");

// AUTHORS

router.get("/authors", function(req, res) {
  AuthorModel.find(req.db, function(err, authors) {
    if (err) {
      res.render("error");
    } else {
      res.render("authors/index", {authors});
    }
  });
});

router.get("/authors/new", function(req, res) {
  res.render("authors/new");
});

router.post("/authors", function(req, res) {
  let author = {
    first_name: req.body.first_name ? req.body.first_name.trim() : null,
    last_name: req.body.last_name ? req.body.last_name.trim() : null
  };
  let errors = AuthorModel.validate(author);
  if (errors.length > 0) {
    res.render("authors/new", {errors});
  } else {
    AuthorModel.insert(author, req.db, function(err, saved) {
      if (err) {
        res.render("error");
      } else {
        res.redirect("/modelview/authors/" + saved.id + "?msg=new");
      }
    });
  }
});

router.get("/authors/:id", function(req, res) {
  AuthorModel.findById(req.params.id, req.db, function(err, author) {
    if (err) {
      res.render("error");
    } else {
      BookModel.findByAuthor(author.id, req.db, function(err, books) {
        if (err) {
          res.render("error");
        } else {
          res.render("authors/edit", {author, books, message: req.query.msg == "new" ? "Author added!" : null});
        }
      });
    }
  });
});

router.post("/authors/:id", function(req, res) {
  AuthorModel.findById(req.params.id, req.db, function(err, author) {
    if (err) {
      res.render("error");
    } else {
      author.first_name = req.body.first_name ? req.body.first_name.trim() : null;
      author.last_name = req.body.last_name ? req.body.last_name.trim() : null;
      let errors = AuthorModel.validate(author);
      if (errors.length > 0) {
        res.render("authors/edit", {author, errors});
      } else {
        AuthorModel.update(author, req.db, function(err, result) {
          if (err) {
            res.render("error");
          } else {
            BookModel.findByAuthor(author.id, req.db, function(err, books) {
              if (err) {
                res.render("error");
              } else {
                res.render("authors/edit", {author, books, message: "Updated!"});
              }
            });
          }
        });
      }     
    }
  });
});

router.put("/authors/:id", function(req, res) {
  AuthorModel.findById(req.params.id, req.db, function(err, author) {
    if (err) {
      res.render("error");
    } else {
      author.first_name = req.body.first_name ? req.body.first_name.trim() : null;
      author.last_name = req.body.last_name ? req.body.last_name.trim() : null;
      let errors = AuthorModel.validate(author);
      if (errors.length > 0) {
        res.render("authors/edit", {author, errors});
      } else {
        AuthorModel.update(author, req.db, function(err, result) {
          if (err) {
            res.render("error");
          } else {
            BookModel.findByAuthor(author.id, req.db, function(err, books) {
              if (err) {
                res.render("error");
              } else {
                res.render("authors/edit", {author, books, message: "Updated!"});
              }
            });
          }
        });
      }     
    }
  });
});

router.delete("/authors/:id", function(req, res) {
  AuthorModel.findById(req.params.id, req.db, function(err, author) {
    if (err) {
      res.render("error");
    } else {
      AuthorModel.removeById(author.id, req.db, function(err, done) {
        if (err) {
          res.render("error");
        } else {
          BookModel.removeByAuthor(author.id, req.db, function(err, done) {
            if (err) {
              res.render("error");
            } else {
              res.redirect("/modelview/authors");
            }
          });
        }
      });
    }
  });
});

router.post("/authors/:id/delete", function(req, res) {
  AuthorModel.findById(req.params.id, req.db, function(err, author) {
    if (err) {
      res.render("error");
    } else {
      AuthorModel.removeById(author.id, req.db, function(err, done) {
        if (err) {
          res.render("error");
        } else {
          BookModel.removeByAuthor(author.id, req.db, function(err, done) {
            if (err) {
              res.render("error");
            } else {
              res.redirect("/modelview/authors");
            }
          });
        }
      });
    }
  });
});



// BOOKS

router.get("/books", function(req, res) {
  BookModel.find(req.db, function(err, books) {
    if (err) {
      res.render("error");
    } else {
      res.render("books/index", {books});
    }
  });
});

router.get("/books/new", function(req, res) {
  AuthorModel.find(req.db, function(err, authors) {
    if (err) {
      res.render("error");
    } else {
      res.render("books/new", {authors});
    }
  });
});

router.post("/books", function(req, res) {
  let book = {
    title: req.body.title ? req.body.title.trim() : null,
    description: req.body.description ? req.body.description.trim() : null,
    year: req.body.year ?  parseInt(req.body.year) : null,
    author_id: req.body.author_id ? parseInt(req.body.author_id) : null
  };
  let errors = BookModel.validate(book);
  if (errors.length > 0) {
    res.render("books/new", {errors});
  } else {
    BookModel.insert(book, req.db, function(err, saved) {
      if (err) {
        console.log(err);
        res.render("error");
      } else {
        res.redirect("/modelview/books/" + saved.id + "?msg=new");
      }
    });
  }
});

router.get("/books/:id", function(req, res) {
  BookModel.findById(req.params.id, req.db, function(err, book) {
    if (err) {
      res.render("error");
    } else {
      AuthorModel.find(req.db, function(err, authors) {
        if (err) {
          res.render("error");
        } else {
          res.render("books/edit", {book, authors, message: req.query.msg == "new" ? "Book added!" : null});
        }
      });
    }
  });
});

router.post("/books/:id", function(req, res) {
  BookModel.findById(req.params.id, req.db, function(err, book) {
    if (err) {
      res.render("error");
    } else {
      book.title = req.body.title ? req.body.title.trim() : null;
      book.description = req.body.description ? req.body.description.trim() : null;
      book.year = req.body.year ?  parseInt(req.body.year) : null;
      book.author_id = req.body.author_id ? parseInt(req.body.author_id) : null;
      let errors = BookModel.validate(book);
      if (errors.length > 0) {
        AuthorModel.find(req.db, function(err, authors) {
          if (err) {
            res.render("error");
          } else {
            res.render("books/edit", {book, errors, authors});
          }
        });
      } else {
        BookModel.update(book, req.db, function(err, result) {
          if (err) {
            res.render("error");
          } else {
            AuthorModel.find(req.db, function(err, authors) {
              if (err) {
                res.render("error");
              } else {
                res.render("books/edit", {book, authors, message: "Updated!"});
              }
            });
          }
        });
      }
    }
  });
});

router.put("/books/:id", function(req, res) {
  BookModel.findById(req.params.id, req.db, function(err, book) {
    if (err) {
      res.render("error");
    } else {
      book.title = req.body.title ? req.body.title.trim() : null;
      book.description = req.body.description ? req.body.description.trim() : null;
      book.year = req.body.year ?  parseInt(req.body.year) : null;
      book.author_id = req.body.author_id ? parseInt(req.body.author_id) : null;
      let errors = BookModel.validate(book);
      if (errors.length > 0) {
        AuthorModel.find(req.db, function(err, authors) {
          if (err) {
            res.render("error");
          } else {
            res.render("books/edit", {book, errors, authors});
          }
        });
      } else {
        BookModel.update(book, req.db, function(err, result) {
          if (err) {
            res.render("error");
          } else {
            AuthorModel.find(req.db, function(err, authors) {
              if (err) {
                res.render("error");
              } else {
                res.render("books/edit", {book, authors, message: "Updated!"});
              }
            });
          }
        });
      }
    }
  });
});

router.delete("/books/:id", function(req, res) {
  BookModel.findById(req.params.id, req.db, function(err, book) {
    if (err) {
      res.render("error");
    } else {
      BookModel.removeById(book.id, req.db, function(err, done) {
        if (err) {
          res.render("error");
        } else {
          res.redirect("/modelview/books");
        }
      });
    }
  });
});

router.post("/books/:id/delete", function(req, res) {
  BookModel.findById(req.params.id, req.db, function(err, book) {
    if (err) {
      res.render("error");
    } else {
      BookModel.removeById(book.id, req.db, function(err, done) {
        if (err) {
          res.render("error");
        } else {
          res.redirect("/modelview/books");
        }
      });
    }
  });
});

module.exports = router;