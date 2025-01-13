const mongoose = require("mongoose");
require("dotenv").config();



// Define the database name and connection URI
const DB_NAME = "ClusterTime";
const DB_URI = process.env.DB_URI
console.log(DB_URI)

// Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => console.log(`Successfully connected to the database: ${DB_NAME}`))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit the process with an error code
  });
