const DB_NAME = require("../scripts/database").DB_NAME;
const TABLE_NAME = "books";

/*
  id number
  title string
  description string
  year number
  author_id number
*/

function validate(data) {
  let errors = [];
  if (!data.title) {
    errors.push("Title is required");
  } else if (typeof data.title != "string") {
    errors.push("Title must be a string");
  } else if (data.title.length >= 255) {
    errors.push("Title is too long");
  } else if (data.title.length < 3) {
    errors.push("Title is too short");
  }

  if (!data.description) {
    errors.push("Description is required");
  } else if (typeof data.description != "string") {
    errors.push("Description must be a string");
  } else if (data.title.description >= 255) {
    errors.push("Description is too long");
  } else if (data.title.description < 3) {
    errors.push("Description is too short");
  }

  if (!data.year) {
    errors.push("Year is required");
  } else if (typeof data.year != "number") {
    errors.push("Year must be a number");
  }

  if (!data.author_id) {
    errors.push("Author ID is required");
  } else if (typeof data.author_id != "number") {
    errors.push("Author ID must be a number");
  }

  return errors;
}

function insert(data, db, cb) {
  db.query(`INSERT INTO ${DB_NAME}.${TABLE_NAME} 
  (title, description, year, author_id) 
  VALUES (?,?,?,?);`, [data.title, data.description, data.year, data.author_id], function(err, result) {
    if (err) {
      return cb(err);
    }
    data.id = result.insertId;
    return cb(null, data);
  });
};

function update(data, db, cb) {
  db.query(`UPDATE ${DB_NAME}.${TABLE_NAME} SET
  title=?, description=?, year=?, author_id=?
  WHERE id=?;`, [data.title, data.description, data.year, data.author_id, data.id], function(err, result) {
    if (err) {
      return cb(err);
    }
    console.log("UPDATE", result)
    return cb(null, data);
  });
};

function removeById(id, db, cb) {
  db.query(`DELETE FROM ${DB_NAME}.${TABLE_NAME}
  WHERE id=?;`, [id], function(err, result) {
    if (err) {
      return cb(err);
    }
    return cb(null, true);
  });
}

function removeByAuthor(id, db, cb) {
  db.query(`DELETE FROM ${DB_NAME}.${TABLE_NAME}
  WHERE author_id=?;`, [id], function(err, result) {
    if (err) {
      return cb(err);
    }
    return cb(null, true);
  });
}

function find(db, cb) {
  db.query(`SELECT * FROM ${DB_NAME}.${TABLE_NAME};`, [], function(err, result) {
    if (err) {
      return cb(err);
    }
    return cb(null, result);
  });
};

function findById(id, db, cb) {
  db.query(`SELECT * FROM ${DB_NAME}.${TABLE_NAME} WHERE id=?;`, [id], function(err, result) {
    if (err) {
      return cb(err);
    } else if (result.length == 0) {
      return cb(null, null);
    } else {
      return cb(null, result[0]);
    }
  });
};

function findByAuthor(author_id, db, cb) {
  db.query(`SELECT * FROM ${DB_NAME}.${TABLE_NAME} WHERE author_id=?;`, [author_id], function(err, result) {
    if (err) {
      return cb(err);
    }

    return cb(null, result);
  });
};

module.exports = {
  validate,
  insert,
  update,
  removeById,
  removeByAuthor,
  find,
  findById,
  findByAuthor
}