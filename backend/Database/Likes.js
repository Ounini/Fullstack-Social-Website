const mongoose = require('mongoose')
const express = require('express')

const app = express()

mongoose.connect('mongodb://localhost:27017/react-fullstack')

const likeSchema = new mongoose.Schema ({
	PostId: {
		type: String,
		required: true
	},	
	UserId: {
		type: String,
		required: true
	}
})
const Like = mongoose.model("Like", likeSchema)

// const like = new Like ({
// 	PostId: "66389f8706537e4b94c3f1da",
// 	UserId: "663d3fee54f2b791001fe4a3"
// })
// like.save()

// app.listen(3005, () => {
// 	console.log("Server started on port 3005")
// })

module.exports = Like