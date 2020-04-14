const DB_NAME = require("../scripts/database").DB_NAME;
const TABLE_NAME = "authors";

/*
  id number
  first_name string
  last_name string
*/

function validate(data) {
  let errors = [];
  if (!data.first_name) {
    errors.push("First name is required");
  } else if (typeof data.first_name != "string") {
    errors.push("First name must be a string");
  } else if (data.first_name.length >= 255) {
    errors.push("First name is too long");
  } else if (data.first_name.length < 3) {
    errors.push("First name is too short");
  }

  if (!data.last_name) {
    errors.push("Last name is required");
  } else if (typeof data.last_name != "string") {
    errors.push("Last name must be a string");
  } else if (data.last_name.length >= 255) {
    errors.push("Last name is too long");
  } else if (data.last_name.length < 3) {
    errors.push("Last name is too short");
  }

  return errors;
}

function insert(data, db, cb) {
  db.query(`INSERT INTO ${DB_NAME}.${TABLE_NAME} 
  (first_name, last_name) 
  VALUES (?,?);`, [data.first_name, data.last_name], function(err, result) {
    if (err) {
      return cb(err);
    }
    data.id = result.insertId;
    return cb(null, data);
  });
};

function update(data, db, cb) {
  db.query(`UPDATE ${DB_NAME}.${TABLE_NAME} SET
  first_name=?, last_name=?
  WHERE id=?;`, [data.first_name, data.last_name, data.id], function(err, result) {
    if (err) {
      return cb(err);
    }
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

module.exports = {
  validate,
  insert,
  update,
  removeById,
  find,
  findById
}