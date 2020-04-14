const db = require("./database");

function rollback(version) {
  var batch = [];
  switch(version) {
    case 1:
      batch.push({query: `DROP TABLE ${db.DB_NAME}.authors;`, message: null});
      batch.push({query: `DROP TABLE ${db.DB_NAME}.books;`, message: null});
      batch.push({
        query: `UPDATE ${db.DB_NAME}.configuration SET value='0' WHERE name='version';`, 
        message: "Database downgrated to version 0"
      });
      break;
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

    var batch = rollback(version);
    db.runBatch(db.connection, batch, 0, batch.length, true, function() {
      db.connection.end(function(err) {
        console.log("Done!");
        process.exit();
      });
    });
  });
});