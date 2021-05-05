const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		title: {
			type: String,
			trim: true,
			required: true,
		},
		slug: {
			type: String,
			unique: true,
			trim: true,
		},
		image: { type: String, required: true },
		body: { type: String, required: true },
		meta: { type: String, required: true },
		status: {
			type: String,
			emum: ["pending", "approved", "cancelled"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
