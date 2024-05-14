const express = require('express')
const Post = require('../Database/Posts')
const Like = require('../Database/Likes')
const {validateToken} = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.get('/', validateToken, async (req, res) => {
	try {
		const listOfPosts = await Post.find().populate('likes')
		const likedPosts = await Like.find({UserId: req.user.id})
		res.json({listOfPosts: listOfPosts, likedPosts: likedPosts})
	} catch (error) {
		console.error('Error fetching posts:', error)
		res.status(500).json({error: 'Internal Server Error'})
	}
})

router.get('/byId/:id', async(req, res) => {
	const _id = req.params.id
	try {
		const post = await Post.findById(_id).populate('likes')
		if (!post) {
			return res.status(404).json({error: 'Post not found'})
		}
		res.json(post)
	} catch (error) {
		console.error('Error fetching post by ID:', error)
		res.status(500).json({error: 'Internal Server Error'})
	}
})

router.get('/byuserId/:id', async(req, res) => {
	const id = req.params.id
	try {
		const listOfPosts = await Post.find({UserId: id}).populate('likes')
		if (!listOfPosts) {
			return res.status(404).json({error: 'Post not found'})
		}
		res.json(listOfPosts)
	} catch (error) {
		console.error('Error fetching post by ID:', error)
		res.status(500).json({error: 'Internal Server Error'})
	}
})

router.post('/', validateToken, async (req, res) => {
	try {
		const post = req.body
		post.username = req.user.username
		post.UserId = req.user.id
		await Post.create(post)
		res.json(post)
	} catch (error) {
		console.error('Error creating post:', error)
		res.status(500).json({error: 'Internal Server Error'})
	}
})

router.put('/title', validateToken, async (req, res) => {
	try {
		const {newTitle, id} = req.body
		await Post.findByIdAndUpdate({_id: id}, {title: newTitle})
		res.json(newTitle)
	} catch (error) {
		console.error('Error updating to new title:', error)
		res.status(500).json({error: 'Internal Server Error'})
	}
})

router.put('/postText', validateToken, async (req, res) => {
	try {
		const {editedPost, id} = req.body
		await Post.findByIdAndUpdate({_id: id}, {postText: editedPost})
		res.json(editedPost)
	} catch (error) {
		console.error('Error editing post:', error)
		res.status(500).json({error: 'Internal Server Error'})
	}
})

router.delete('/:postId', validateToken, async (req, res) => {
	try {
		const postId = req.params.postId
		await Post.findByIdAndDelete(postId)
		res.json('Successfully deleted post')
	} catch (error) {
		console.error('Error deleting post:', error)
		res.status(500).json({error: 'Internal Server Error'})
	}
})

module.exports = router