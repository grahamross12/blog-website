// Required external modules
require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require("./models");
const bodyParser = require("body-parser");
const axios = require("axios");

const apiRouter = require("./routes/index.js");

// App variables
const app = express();
const PORT = process.env.PORT || 5000;

// App configuration
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", apiRouter);

async function startServer() {
  try {
    await db.sequelize.sync();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Error: " + err);
  }
}

startServer();
