// Required external modules
const express = require("express");

const db = require("./models");

const usersRouter = require("./routes/users.js");
const blogsRouter = require("./routes/blogs.js");

// App variables
const app = express();
const PORT = process.env.PORT || 5000;

// App configuration
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

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
