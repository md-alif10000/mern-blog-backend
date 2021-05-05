const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
require("dotenv").config();
const createToken = (user) => {
	return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
exports.register = async (req, res) => {
	const { name, email, username, password } = req.body;
	

	try {
		const checkUser = await User.findOne({ email });
		if (checkUser) {
			return res.status(400).json({ errors: [{ msg: "User Alreary Exist" }] });
		} else {
			const hash = await bcrypt.hash(password, 10);
			const username=await name.toLowerCase()+shortid.generate().slice(0,5)
			console.log(username)

			const user = await new User({
				name,
				email,
				password: hash,
				username
			});
			const token = createToken(user);

			user.save((error, data) => {
				if (error) {
					console.log(error);
					return res
						.status(400)
						.json({ errors: [{ msg: "Something went wrong" }] });
				}

				if (data) {
					return res.status(201).json({
						message: "Your account has been created",
						token,
					});
				}
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ errors: error });
	}
};

exports.login = (req, res) => {
	const { email, password } = req.body;

	try {
		User.findOne({ email })
			.then(async (user) => {
				console.log(user);

				if (!user) {
					return res.status(404).json({
						errors: [
							{
								msg: "User not found",
							},
						],
					});
				}

				if (user) {
					const match = await bcrypt.compare(password, user.password);
					if (!match) {
						return res.status(401).json({
							errors: [
								{
									msg: "Password doesn't match",
								},
							],
						});
					}

					if (match) {
						const token = createToken(user);
						const { _id, name, email, role, username } = user;

						return res.status(200).json({
							token,
							message: "Login successfull",
							user: {
								_id,
								name,
								email,
								role,
								username,
							},
						});
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} catch (error) {
		console.log(error);
	}
};

