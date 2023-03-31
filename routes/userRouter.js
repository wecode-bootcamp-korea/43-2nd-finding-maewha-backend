const express = require("express");
const userController = require("../controllers/userController");
const { loginRequired } = require("../utils/auth");
const router = express.Router();

router.post("/kakao", userController.kakaoSignIn);
router.get("/libraries", loginRequired, userController.getUserLibraries);
router.get("", loginRequired, userController.getPlacesInUserLibrary);
router.delete(
  "/libraries/places/:placeId",
  loginRequired,
  userController.deletePlaceLike
);
router.delete(
  "/libraries/:libraryId",
  loginRequired,
  userController.deleteLibrary
);

module.exports = { router };
