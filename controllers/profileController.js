const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.updateProfile = async (req, res) => {
	const _id = req.user._id;
	const { name, email, username } = req.body;

	const errors = [];

	if (name == "") errors.push({ msg: "Title is required" });
	if (email == "") errors.push({ msg: "Body is required" });
	if (username == "") errors.push({ msg: "Meta description is required" });
	if (req.file) {
		const fileType = req.file.mimetype;
		const ext = fileType.split("/")[1].toLowerCase();
		if (ext !== "jpg" && ext !== "png" && ext !== "jpeg")
			errors.push({ msg: "This file is not supported" });
	}

	if (errors.length > 0) return res.status(400).json({ errors: errors });

	if (req.file) {
		req.body.profilePicture = req.file.filename;
	}


    var body=req.body
    if (req.body.profilePicture===''){
        var body = { name, username, email };
    }
			try {
				var user = await User.findOneAndUpdate({ _id }, body);
				var user = await User.findOneAndUpdate({ _id }, body );

				const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
					expiresIn: "7d",
				});
				console.log(token);
				console.log(user);
				return res.status(201).json({ user, token });
			} catch (error) {
				console.log(error);
				return res
					.status(400)
					.json({ errors: [{ msg: "Can't update profile" }] });
			}
};
