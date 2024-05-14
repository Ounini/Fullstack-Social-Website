const mongoose = require('mongoose')
const express = require('express')

const app = express()

mongoose.connect('mongodb://localhost:27017/react-fullstack')

const userSchema = new mongoose.Schema ({
	username: {
		type: String,
		allowNull: false
	}, 
	password: {
		type: String,
		allowNull: false
	}
})

const User = mongoose.model("User", userSchema)

// const user = new User ({
// 	username: "Slimmzy007",
// 	password: "slimmzy007$$"
// })

// user.save()

// User.associate = (Database) => {
// 	User.hasMany(Database.Post, {
// 		onDelete: "cascade"
// 	})
// }

module.exports = User

// app.listen(3005, () => {
// 	console.log("Server started on port 3005")
// })