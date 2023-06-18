const express = require("express");
const multer = require("multer");
const multerConfig = require("../utils/multer");
const path = require("path");

const router = express.Router();

//imports
const CreateUserController = require("../controllers/user/CreateUserController");
const AuthController = require("../controllers/user/AuthController");
const CreateMovieController = require("../controllers/movie/CreateMovieController");
const CreateRatingController = require("../controllers/rating/CreateRatingController");
const GetAllMoviesController = require("../controllers/movie/GetAllMoviesController");
const GetMovieByIdController = require("../controllers/movie/GetMovieByIdController");
const GetUserByIdController = require("../controllers/user/GetUserByIdController");

//controller
const createUserController = new CreateUserController();
const authController = new AuthController();
const createMovieController = new CreateMovieController();
const createRatingController = new CreateRatingController();
const getAllMoviesController = new GetAllMoviesController();
const getMovieByIdController = new GetMovieByIdController();
const getUserByIdController = new GetUserByIdController();

router.get("/", (req, res) => {
  res.send({ ok: true });
});

router.post("/signup", createUserController.handle);
router.post("/auth", authController.handle);

// router.post("/user/:userId/likes", createLikeController.handle);
router.get("/user/:userId/rating", getUserByIdController.handle);

router.post(
  "/movie/:userId",
  multer(multerConfig).single("file"),
  createMovieController.handle
);
router.get("/movies", getAllMoviesController.handle);
router.get("/movie/:id", getMovieByIdController.handle);

router.post("/movie/:movieName/ratings", createRatingController.handle);

module.exports = router;
