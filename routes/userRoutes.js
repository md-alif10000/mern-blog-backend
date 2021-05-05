const { register, login,updateProfile } = require("../controllers/userController");
const { isLoggedin } = require("../middleware/auth-middleware");
const {
	isRegisterValidated,
	registerValidation,
	loginValidation,
	isLoginValidated,
} = require("../middleware/validator");
const { upload } = require("../middleware/multer");

const router = require("express").Router();

router.post("/register", registerValidation, isRegisterValidated, register);

router.post("/login", loginValidation, isLoginValidated, login);

module.exports = router;
