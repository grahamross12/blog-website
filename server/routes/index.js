const express = require("express");
const cors = require("cors");
const { users, blogs, savedBlogs, tags, blogTags } = require("../models");
const router = express.Router();
const { Op, literal } = require("sequelize");

users.hasMany(blogs, { as: "blogs", foreignKey: "userid" });
blogs.belongsTo(users, { as: "user", foreignKey: "userid" });
blogs.hasMany(savedBlogs, { as: "savedBlogs", foreignKey: "blogId" });
blogTags.belongsTo(blogs, { as: "blogs", foreignKey: "blogId" });
blogTags.belongsTo(tags, { as: "tag", foreignKey: "tagId" });
blogs.hasMany(blogTags, { as: "tags", foreignKey: "blogId" });
tags.hasMany(blogTags, { as: "blogTags", foreignKey: "tagId" });

// Return all tags
router.get("/tags", cors(), async (req, res) => {
  try {
    const tagsInfo = await tags.findAll({ order: [["tag", "ASC"]] });
    res.send(tagsInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Return all blog posts and their authors
router.get("/blogs", cors(), async (req, res) => {
  try {
    // Obtain all rows of vehichles database
    const blogsInfo = await blogs.findAll({
      include: [
        { model: users, as: "user" },
        { model: savedBlogs, as: "savedBlogs" },
        {
          model: blogTags,
          as: "tags",
          include: [{ model: tags, as: "tag", foreignKey: "tagId" }],
        },
      ],
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

// Find a user id given a username
router.get("/users/username/:username", cors(), async (req, res) => {
  try {
    const username = req.params.username;
    const userid = await users.findAll({
      attributes: ["id"],
      where: { username: username },
    });
    res.send(userid[0]);
  } catch (err) {
    console.err(err);
    res.sendStatus(500);
  }
});

// Return specific blogs given a search query
router.get("/blogs/search/:searchQuery", cors(), async (req, res) => {
  try {
    const searchQuery = req.params.searchQuery;
    const blogsInfo = await blogs.findAll({
      include: [
        { model: users, as: "user" },
        { model: savedBlogs, as: "savedBlogs" },
        {
          model: blogTags,
          as: "tags",
          include: [{ model: tags, as: "tag", foreignKey: "tagId" }],
        },
      ],
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

// Return blogs of a given tag
router.get("/blogs/tag/:tag", cors(), async (req, res) => {
  try {
    const tag = req.params.tag;
    const blogsInfo = await tags.findAll({
      where: { tag: tag },
      include: [
        {
          model: blogTags,
          as: "blogTags",
          attribues: ["blogs"],
          include: [
            {
              model: blogs,
              as: "blogs",
              foreignKey: "blogId",
              attributes: ["id"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    if (!blogsInfo[0]) {
      res.send([]);
      return;
    }
    // Retrieve the blog ids
    let blogIds = [];
    blogsInfo[0].dataValues.blogTags.forEach((blog) => {
      console.log(blog);
      blogIds.push(blog.dataValues.blogs.id);
    });
    // Send the blogs of the corresponding ids
    const blogsData = await blogs.findAll({
      where: { id: blogIds },
      include: [
        { model: users, as: "user" },
        { model: savedBlogs, as: "savedBlogs" },
        {
          model: blogTags,
          as: "tags",
          include: [{ model: tags, as: "tag", foreignKey: "tagId" }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.send(blogsData);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Return sepecif blogs given a search query
router.put("/blogs/:id/saves/:saves", cors(), async (req, res) => {
  try {
    console.log("PUT REQUEST ON /API/BLOGS");
    const id = req.params.id;
    const saves = req.params.saves;
    const blogsInfo = await blogs.update(
      { saves: saves },
      {
        where: {
          id: id,
        },
      }
    );
    res.send(blogsInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Delete a blog from the table of user's saved blogs
router.delete("/savedblogs/:userid/:blogid", cors(), async (req, res) => {
  try {
    const userid = req.params.userid;
    const blogid = req.params.blogid;
    const savedBlogsInfo = await savedBlogs.destroy({
      where: { userid: userid, blogid: blogid },
    });
    res.send(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Add a blog to the table of user's saved blogs
router.post("/savedblogs/:userid/:blogid", cors(), async (req, res) => {
  try {
    const userid = req.params.userid;
    const blogid = req.params.blogid;
    const savedBlogsInfo = await savedBlogs.create({
      userid: userid,
      blogid: blogid,
    });
    res.send(savedBlogsInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Check if blog url is unique
router.get("/blogs/blogUrl/:blogUrl", cors(), async (req, res) => {
  try {
    const blogUrl = req.params.blogUrl;
    const blogsInfo = await blogs.findAll({
      include: [{ model: users, as: "user" }],
      where: { url: blogUrl },
    });
    if (!blogsInfo[0]) {
      res.send(true);
      return;
    }
    res.send(false);
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
        { model: savedBlogs, as: "savedBlogs" },
        {
          model: blogTags,
          as: "tags",
          include: [{ model: tags, as: "tag", foreignKey: "tagId" }],
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
router.get(
  "/users/username/:username/blogUrl/:blogUrl",
  cors(),
  async (req, res) => {
    try {
      const username = req.params.username;
      const url = req.params.blogUrl;
      const userInfo = await users.findAll({
        where: { username: username },
        include: [
          {
            model: blogs,
            as: "blogs",
            where: { url: url },
            include: {
              model: blogTags,
              as: "tags",
              include: [{ model: tags, as: "tag", foreignKey: "tagId" }],
            },
          },
        ],
      });
      if (!userInfo[0]) {
        res.sendStatus(404);
        return;
      }
      if (!userInfo[0].blogs[0]) {
        res.sendStatus(404);
        return;
      }
      res.send(userInfo[0].blogs[0]);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

// Add a blog post to the blogs table
router.post("/blogs", cors(), async (req, res) => {
  try {
    const username = req.body.username;
    const title = req.body.title;
    const content = req.body.content;
    const url = req.body.url;
    const tags = req.body.tags;
    // Find id of user
    let userid = await users.findAll({
      attributes: ["id"],
      where: { username: username },
    });
    userid = userid[0].dataValues.id;

    // Check if blog title is already created
    const checkBlog = await blogs.findAll({
      where: { title: title, userid: userid },
    });
    if (checkBlog[0]) {
      res.sendStatus(200);
      return;
    }

    const newBlog = await blogs.create({
      userid: userid,
      title: title,
      content: content,
      url: url,
    });

    // Add tags to the blogTags table
    tags.forEach(async (tagid) => {
      await blogTags.create({
        tagId: tagid,
        blogId: newBlog.dataValues.id,
      });
    });

    res.send(newBlog);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Add a user to the users table
router.post("/users", cors(), async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const picture = req.body.picture;

    // Check if user is already in users table
    const user = await users.findAll({ where: { username: username } });
    if (user[0]) {
      res.sendStatus(200);
      return;
    }
    // Add new user to the users table
    const newUser = users.create({
      username: username,
      email: email,
      picture: picture,
    });
    res.send(newUser);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/blogs/suggestions", cors(), async (req, res) => {
  try {
    const blogSuggestions = await blogs.findAll({
      order: literal("rand()"),
      limit: 5,
      include: [{ model: users, as: "user" }],
    });
    res.send(blogSuggestions);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/tags", cors(), async (req, res) => {
  try {
    const tags = await tags.findAll({ order: ["tag", "ASC"] });
    res.send(tags);
  } catch (err) {
    console.err(err);
    res.sendStatus(500);
  }
});

module.exports = router;
