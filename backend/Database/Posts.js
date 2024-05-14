const mongoose = require('mongoose')
const Like = require('./Likes')
const express = require('express')

const app = express()

mongoose.connect('mongodb+srv://Admin-Ounini:Slimmzy2468@atlascluster.bvmxvgc.mongodb.net/react-fullstack')

const postSchema = new mongoose.Schema ({
	title: {
		type: String,
		required: true
	},
	postText: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	UserId: {
		type: String,
		required: true
	},
	likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Like'}]
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post


// const post = new Post ({
// 	title: "Apple fruit",
// 	postText: "The last apple fruit i ate was so good i couldnt get enough of it",
// 	username: "Shade",
// 	UserId: "663c1e830102c98b5f9f75a9"
// })

// post.save()


// // app.get('/', function(req, res) {
// // 	Post.findById('66389f8706537e4b94c3f1da')
// // 	.then(result => {
// // 		console.log(result)
// // 	})
// // })

// app.listen(3005, () => {
// 	console.log("Server started on port 3005")
// })