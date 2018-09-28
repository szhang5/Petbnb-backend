const express = require("express");
const app = express();
    
//requiring routes
const indexRoutes = require("./routes/index");

app.use("/", indexRoutes);

app.listen(8080, function(){
    console.log("The Petbnb Server has started!");
});