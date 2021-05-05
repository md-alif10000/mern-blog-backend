const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 15,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},

		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		password: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},

		profilePicture: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
