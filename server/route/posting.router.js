const router = require("express").Router();
const postingController = require("../controller/posting.controller")

router.get("/", postingController.getPostings)
router.post("/", postingController.newPosting)
router.put("/", postingController.modifyPosting)
router.delete("/", postingController.deletePosting)
module.exports = router