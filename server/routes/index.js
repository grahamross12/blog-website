const express = require("express");
const cors = require("cors");
const { users, blogs } = require("../models");
const router = express.Router();
const { Op } = require("sequelize");

users.hasMany(blogs, { as: "blogs", foreignKey: "userid" });
blogs.belongsTo(users, { as: "user", foreignKey: "userid" });

// Return all blog posts and their authors
router.get("/blogs", cors(), async (req, res) => {
  try {
    // Obtain all rows of vehichles database
    const blogsInfo = await blogs.findAll({
      include: [{ model: users, as: "user" }],
      order: [["createdAt", "DESC"]],
    });
    // Return the results as JSON
    res.send(blogsInfo);
  } catch (err) {
    // Log the error if there is a problem
    console.error(err);
    res.sendStatus(500);
  }
});

// Return sepecif blogs given a search query
router.get("/blogs/:searchQuery", cors(), async (req, res) => {
  try {
    const searchQuery = req.params.searchQuery;
    const blogsInfo = await blogs.findAll({
      include: [{ model: users, as: "user" }],
      where: {
        [Op.or]: [{ title: { [Op.like]: "%" + searchQuery + "%" } }],
      },
      order: [["createdAt", "DESC"]],
    });
    res.send(blogsInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Return all blog posts from a given user
router.get("/users/:username", cors(), async (req, res) => {
  try {
    const username = req.params.username;
    const blogsInfo = await blogs.findAll({
      include: [
        {
          model: users,
          as: "user",
          where: { username: username },
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    if (!blogsInfo.length) {
      res.sendStatus(400);
      return;
    }
    res.send(blogsInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Return single blog post given a username and blog title
router.get("/users/:username/:blogTitle", cors(), async (req, res) => {
  try {
    const username = req.params.username;
    const title = req.params.blogTitle;
    const userInfo = await users.findAll({
      where: { username: username },
      include: [{ model: blogs, as: "blogs", where: { title: title } }],
    });
    if (!userInfo[0].blogs[0]) {
      res.sendStatus(404);
      return;
    }
    res.send(userInfo[0].blogs[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Add a blog post to the database
router.post("/blogs", cors(), async (req, res) => {
  try {
    const username = req.body.username;
    const title = req.body.title;
    const content = req.body.content;
    let userid = await users.findAll({
      attributes: ["id"],
      where: { username: username },
    });
    userid = userid[0].dataValues.id;
    const newBlog = blogs.create({
      userid: userid,
      title: title,
      content: content,
    });
    res.send(newBlog);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
