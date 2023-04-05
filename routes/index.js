const express = require("express");

const userRouter = require("./userRouter");
const placeRouter = require("./placeRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/places", placeRouter.router);


module.exports = router;
