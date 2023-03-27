const express = require("express");
const router = express.Router();

router.get("/kakao", passport.authenticate("kakao-login"));
router.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao-login", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = {
  router,
};
