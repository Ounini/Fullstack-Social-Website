const express = require('express')
const Like = require('../Database/Likes')
const Post = require('../Database/Posts')
const {validateToken} = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.post('/', validateToken, async (req, res) => {
	const {PostId} = req.body
	const UserId = req.user.id

	try {
		const found = await Like.findOne({PostId: PostId, UserId: UserId})
		if (!found) {
			await Like.create({PostId: PostId, UserId: UserId})
			await updatePostLikes(PostId)
			res.json('liked')
		} else {
			await Like.findOneAndDelete({PostId: PostId, UserId: UserId})
			await updatePostLikes(PostId)
			res.json('unliked')
		}
	} catch (error) {
	 	console.error('Error in like/unlike operations:', error)
		res.status(500).json({error: 'Internal Server Error'})
	}	
})

async function updatePostLikes(PostId) {
	const likes = await Like.find({PostId: PostId})
	const likeIds = likes.map(like => like._id)
	await Post.findByIdAndUpdate(PostId, { likes: likeIds})
}

module.exports = router