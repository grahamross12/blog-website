const express = require("express");
const cors = require("cors");
const { users, blogs } = require("../models");
const router = express.Router();

router.get("/", cors(), async (req, res) => {
  try {
    // Obtain all rows of vehichles database
    const usersInfo = await users.findAll();
    // Return the results as JSON
    res.send(usersInfo);
  } catch (err) {
    // Log the error if there is a problem
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:username", cors(), async (req, res) => {
  try {
    const username = req.params.username;
    const userInfo = await users.findAll({ where: { username: username } });
    res.send(userInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/:username/:blogTitle", cors(), async (req, res) => {
  try {
    const username = req.params.username;
    const userInfo = await users.findAll({ where: { username: username } });
    if (!userInfo[0]) {
      console.log("123435674");
      res.sendStatus(404);
      return;
    }
    const title = req.params.blogTitle;
    const blogInfo = await blogs.findAll({
      where: { userid: userInfo[0].id, title: title },
    });
    if (!blogInfo[0]) {
      console.log(userInfo[0].id);
      console.log("SAHGOINVKLNAKLVNLKS");
      res.sendStatus(404);
      return;
    }
    res.send(blogInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
