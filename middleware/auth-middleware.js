const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.isLoggedin = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ errors: [{ msg: "Please login first" }] });
	}
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(" ")[1];

		const user = jwt.verify(token, process.env.JWT_SECRET);
     
		req.user = user.user;
      
		next();
	}
};
