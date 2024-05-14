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

app.listen(3008, () => {
	console.log('Server running on port 3008 ')
})