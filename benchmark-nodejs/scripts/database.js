const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '1234abcde'
});

const DB_NAME = "db_nodejs";

const DB_VERSION = 1;

function initDB(db, cb) {
  console.log("Starting connection with DB");
  
  db.query("CREATE DATABASE IF NOT EXISTS " + DB_NAME, [], function(err, results) {
    if (err) {
      return cb(err);
    }

    db.query(`CREATE TABLE IF NOT EXISTS ${DB_NAME}.configuration (
      id INTEGER NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NULL,
      value VARCHAR(1024) NULL,
      PRIMARY KEY(id)
    );`
    , [], function(err, results) {
      if (err) {
        return cb(err);
      }

      getVersion(db, function(err, data) {
        if (err) {
          return cb(err);
        } else if (data == null) {
          addVersion(db, function(err) {
            if (err) {
              return cb(err);
            }

            return cb(null, 0);
          });

        } else {
          return cb(null, parseInt(data.value));
        }
      });
    });
  });
};

function getVersion(db, cb) {
  db.query("SELECT * FROM " + DB_NAME + ".configuration where name = ?", ["version"], function(err, results) {
    if (err) {
      return cb(err);
    } else if (results.length == 0) {
      return cb(null, null);
    } else {
      return cb(null, results[0]);
    }
  });
};

function addVersion(db, cb) {
  db.query("INSERT INTO " + DB_NAME + ".configuration (name, value) VALUES (?,?);", ["version", 0], function(err, results) {
    if (err) {
      return cb(err);
    } else {
      return cb(null)
    }
  });
}

function runBatch(db, batch, current, total, isFirst, done) {
  // Main thread
  if (isFirst) {
    runBatch(db, batch, 0, total, false, function() {
      done();
    });
  } else {
    // Workers
    if (current >= total) {
      done();
    } else {
      // Run query
      let query = batch[current].query;
      console.log("Run Query:", query);
      db.query(batch[current].query, [], function(err, result) {
        if (err) {
          throw err;
        }

        console.log("Query executed successfully");

        var message = batch[current].message;
        if (message) {
          console.log(message);
        }

        // Run next query
        runBatch(db, batch, current + 1, total, false, function() {
          done();
        });
      });
    }
  }
}

module.exports = {
  connection,
  DB_NAME,
  DB_VERSION,
  initDB,
  runBatch
}