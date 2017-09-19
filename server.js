// Include Server Dependencies
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//Require History Schemas
var Article = require("./models/Article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static("./public"));

// MongoDB Configuration configuration (Change this URL to your own DB)

mongoose.connect("mongodb://localhost/reactdb"); 
 
var db = mongoose.connection;

//Show any mongoose error

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});


//  Once logged in to the db through mongoose, log a successful message

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//initialize api routes
app.use("/api", require("./routes/apiRoutes"));
// Main "/" Route. This will redirect the user to our rendered React application
app.use("/", require("./routes/viewRoutes"));

// Listener
app.listen(PORT, function() {
  console.log("App listening  on PORT: " + PORT);
});
