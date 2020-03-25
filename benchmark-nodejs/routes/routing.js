// Router Middleware
const express = require("express");
const router = express.Router();
const path = require("path");

// Routing Test
router.get("/hello", function(req, res) {
  res.send("Hello World!");
});

router.get("/hello/json", function(req, res) {
  res.json({message: "Hello World!"});
});

router.get("/hello/html", function(req, res) {
  res.sendFile(path.join(__dirname + "/../templates/hello.html"));
});

router.get("/hello/html/:msg", function(req, res) {
  res.render("hello_msg", {msg: req.params["msg"]})
});

router.get("/hello/msg/:msg", function(req, res) {
  res.send("Hello World! - " + req.params["msg"]);
});

router.get("/hello/query", function(req, res) {
  res.send("Hello World! - " + req.query["msg"]);
});

router.get("/badrequest", function(req, res) {
  res.status(400).send("Successful response!");
});

router.get("/list", function(req, res) {
  let text = "";
  for (var x = 1; x <= 5000; x++) {
    text += "This is the line " + x + "\r\n<br>";
  }
  res.send(text);
});

module.exports = router;