// Required external modules
const express = require("express");
require("dotenv").config();
const { auth } = require("express-openid-connect");

const db = require("./models");

const usersRouter = require("./routes/users.js");
const blogsRouter = require("./routes/blogs.js");
const authRouter = require("./routes/auth.js");

// App variables
const app = express();
const PORT = process.env.PORT || 5000;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use("/", auth(config));

// App configuration
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/", authRouter);

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
