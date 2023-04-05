const express = require("express");

const userRouter = require("./userRouter");
const reviewRouter = require("./reviewRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/reviews", reviewRouter.router);


module.exports = router;
