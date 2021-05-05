const mongoose=require('mongoose')

const commentSchema = new mongoose.Schema({
	postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment:{type:String}
},{timestamps:true});

module.exports=new mongoose.model("Comment",commentSchema)