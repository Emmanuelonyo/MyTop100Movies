"use strict";

"use strict";
const express = require('express');
const movieRoute = require('./routes/movie');


const app = express();
app.use(express.json());

//link up the routes and middlewares

app.use("/api/v1", movieRoute)


module.exports = app;