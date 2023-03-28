const express = require("express");

const userRouter = require("./userRouter");
const placesRouter = require("./placesRouter");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/places", placesRouter.router);


module.exports = router;
