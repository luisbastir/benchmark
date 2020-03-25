// Express - Server Framework
const express = require("express");
const app = express();
const port = 3000;

const routing = require("./routes/routing");

// add templage engine
app.set("view engine", "pug")
app.set("views", "./templates")

app.use(routing);

app.listen(port, function() {
  console.log("Running server!");
});