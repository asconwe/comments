// Dependencies
var bodyParser = require("body-parser");
var express = require("express");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var controllers = require("./controller.js");

mongoose.Promise = Promise; // What is this for? I'm not using promises with Mongoose, am I?

// Initialize Express
var app = express();

// Set view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use body-parser in our app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Database configuration
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect("mongodb://localhost/comments")
}
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Initialize all controllers passing the server app as an argument
controllers(app);

// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on http://localhost:3000");
});