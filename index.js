"use strict";
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const app = require('./src/app');
const config = require("./config");
const loadConfig = config();


const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    
    connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    

  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

function connectDB() {
  mongoose.connect(loadConfig.database.connection_string || "mongodb://localhost:27017/MyTop100Movies")
      .then(() => {
          const db = mongoose.connection;
          db.on('error', (err) => console.error(err));
          db.once('open', () => console.log("Connection to database was successful"));
      })
      .catch((err) => console.error(err));
}

startServer();
