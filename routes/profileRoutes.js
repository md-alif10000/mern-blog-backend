const router =require('express').Router()

const {
	updateProfile,
} = require("../controllers/profileController");
const { isLoggedin } = require("../middleware/auth-middleware");
const { upload } = require("../middleware/multer");

router.put(
	"/update-profile",
	isLoggedin,
	upload.single("profilePicture"),
	updateProfile
);
module.exports = router;
