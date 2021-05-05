const { body, validationResult } = require("express-validator");
exports.registerValidation = [
	body("name").not().isEmpty().withMessage("Name is required"),
	body("email").not().isEmpty().trim().withMessage("Email is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be 6 character long"),
];

exports.isRegisterValidated = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(req);
		return res.status(400).json({errors:errors.array()});
	} else {
		next();
	}
};

exports.loginValidation = [
	body("email").not().isEmpty().trim().withMessage("Email is required"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be 6 character long"),
];

exports.isLoginValidated = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(req);
		return res.status(400).json({ errors: errors.array() });
	} else {
		next();
	}
};



exports.postValidation = [

	// body("user").not().isEmpty().withMessage("Please login first."),
	// body("title").not().isEmpty().withMessage("Title is required"),
	// body("slug").not().isEmpty().withMessage("Slug is required"),
	// body("image").not().isEmpty().withMessage("Image is required"),
	// body("meta").not().isEmpty().withMessage("Meta description is required "),
];

exports.isPostValidated = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(req);
		return res.status(400).json({ errors: errors.array() });
	} else {
		next();
	}
};


exports.updateValidation=[
	body('title')
]