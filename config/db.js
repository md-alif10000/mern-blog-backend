const { response } = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

module.exports = connect = async () => {
	try {
		const response = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
			useCreateIndex:true,
			useFindAndModify:false
        });
		console.log("Database is connected");
	} catch (error) {
		console.log(error);
	}
};
