const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Routers
const postRouter = require('./routes/Posts')
app.use('/posts', postRouter)
const commentRouter = require('./routes/Comments')
app.use('/comments', commentRouter)
const userRouter = require('./routes/Users')
app.use('/auth', userRouter)
const likeRouter = require('./routes/Likes')
app.use('/likes', likeRouter)

let port = process.env.PORT
if (port == null || port == "") {
 	port = 3008
 }
 app.listen(port, function() {
  	console.log("Server started on port 3008")
  })