const express = require("express");
const cors = require("cors");
const router = express.Router();

router.get("/", cors(), (req, res) => {
  // res.redirect(
  //   url.format({
  //     pathname: "http://localhost:3000",
  //     query: {
  //       isAuthenticated: req.oidc.isAuthenticated(),
  //     },
  //   })
  // );
});

module.exports = router;
