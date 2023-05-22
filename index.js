"use strict";
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const app = require('./src/app');
const config = require("./config");
const loadConfig = config();


const PORT = process.env.PORT || 3000;

connectDB();

let server = app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
});



function connectDB() {
  mongoose.connect(loadConfig.database.connection_string || "mongodb://localhost:27017/MyTop100Movies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
      .then(() => {
          const db = mongoose.connection;
          db.on('error', (err) => console.error(err));
          db.once('open', () => console.log("Connection to database was successful"));
      })
      .catch((err) => console.error(err));
}


module.exports = server;