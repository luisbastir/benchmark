const db = require("./database");

function migrate(version) {
  var batch = [];
  switch(version) {
    case 0:
      batch.push({query: `CREATE TABLE IF NOT EXISTS ${db.DB_NAME}.authors (
        id INTEGER NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255) NULL,
        last_name VARCHAR(255) NULL,
        PRIMARY KEY(id)
      );`, message: null});
      batch.push({query: `CREATE TABLE IF NOT EXISTS ${db.DB_NAME}.books (
        id INTEGER NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NULL,
        description VARCHAR(255) NULL,
        year INTEGER,
        author_id INTEGER,
        PRIMARY KEY(id)
      );`, message: null});
      batch.push({
        query: `UPDATE ${db.DB_NAME}.configuration SET value='1' WHERE name='version';`, 
        message: "Database updated to version 1"
      });
    default:
      break;
  }

  return batch;
};

db.connection.connect(function(err) {
  if (err) {
    throw err;
  }

  db.initDB(db.connection, function(err, version) {
    if (err) {
      throw err;
    }

    var batch = migrate(version);
    db.runBatch(db.connection, batch, 0, batch.length, true, function() {
      db.connection.end(function(err) {
        console.log("Done!");
        process.exit();
      });
    });
  });
});