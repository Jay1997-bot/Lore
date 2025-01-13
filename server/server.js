const express = require("express");
const app = express();
const cors = require('cors') 
const PORT = process.env.PORT || 8000
//very important make sure to get the routing right!!!!!!!!!
require("./config/mongoose.config");

app.use(cors()) 
app.use(express.json(), express.urlencoded({ extended: true }));
    
// const AllMyJokeRoutes = require("./routes/joke.routes");
// AllMyJokeRoutes(app);
require('./routes/historicalFigure.routes')(app)

app.listen(PORT, () => console.log("The server is all fired up on port" + PORT));