const mongoose = require('mongoose')
const express = require('express')

const app = express()

mongoose.connect('mongodb+srv://Admin-Ounini:Slimmzy2468@atlascluster.bvmxvgc.mongodb.net/react-fullstack')

const commentSchema = new mongoose.Schema ({
	commentBody: {
		type: String,
		allowNul: false
	},
	PostId: String,
	username: {
		type: String,
		allowNul: false
	}
})
const Comment = mongoose.model("Comment", commentSchema)



// const comment = new Comment ({
// 	commentBody: "tell me somthing i cant do you know ? lol",
// 	PostId: "66389f8706537e4b94c3f1da",
// 	username: "Slimmzy"
// })
// comment.save()

// console.log(comment)

// app.listen(3005, () => {
// 	console.log("Server started on port 3005")
// })

module.exports = Comment