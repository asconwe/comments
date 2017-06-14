/* Scraping into DB (18.2.5)
 * ========================== */

// Dependencies
var bodyParser = require("body-parser");
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var bunchOControllers = require("bunch-o-controllers");

mongoose.Promise = Promise;

// Initialize Express
var app = express();
// Use body-parser in our app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Database configuration
mongoose.connect("mongodb://localhost/comments")
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
bunchOControllers(app);

// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on http://localhost:3000");
});