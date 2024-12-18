const mongoose = require("mongoose");


const DB_NAME = "pirates"

mongoose.connect("mongodb://localhost/"+ DB_NAME,)
	.then(() => console.log("Database connection is working"))
	.catch(err => console.log("Something went wrong when connecting to the database", err));