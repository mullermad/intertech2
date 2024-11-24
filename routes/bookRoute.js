const express = require("express");
const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getRecommendation,
  markAsFavorite,
  favouriteBooks,
} = require("../controller/bookController");

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/recommendations", getRecommendation);
router.post("/:id/favorite", markAsFavorite);
router.get("/favourite", favouriteBooks);

module.exports = router;
