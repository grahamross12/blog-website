const express = require("express");
const cors = require("cors");
const { blogs, users } = require("../models");
const router = express.Router();

router.get("/", cors(), async (req, res) => {
  try {
    // Obtain all rows of vehichles database
    const blogsInfo = await blogs.findAll();
    // Return the results as JSON
    res.send(blogsInfo);
  } catch (err) {
    // Log the error if there is a problem
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
