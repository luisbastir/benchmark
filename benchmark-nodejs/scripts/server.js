// Express - Server Framework
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const app = express();
const port = 3000;

const db = require("./database");
const routing = require("../routes/routing");
const modelview = require("../routes/modelview");


// Script to load the DB and then load Express
function initServer() {
  db.connection.connect(function(err) {
    if (err) {
      throw err;
    }
    
    db.initDB(db.connection, function(err, version) {
      if (err) {
        throw err;
      } else {
        console.log("DB version:", version);
        if (db.DB_VERSION > version) {
          console.log("Warning:","The current version of the database is lower than the defined version in the service");
        }

        // add db middleware
        app.use(function(req, res, next) {
          req.db = db.connection;
          next();
        });
        
        // add templage engine
        app.set("view engine", "pug")
        app.set("views", "./templates")

        // add parsers
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(upload.array());  

        app.use(routing);
        app.use("/modelview", modelview);

        app.listen(port, function() {
          console.log("Running server!");
        });
      }
    });
  });
}

initServer();

process.on("SIGINT", () => {
  db.connection.end();
  console.log("Server off");
  process.exit();
})