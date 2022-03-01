const router = require("express").Router();
const postingController = require("../controller/posting.controller")

router.get("/", postingController.getPostings)
// router.get("/:id", postingController.getPostingsByUser)
router.post("/", postingController.newPosting)
module.exports = router