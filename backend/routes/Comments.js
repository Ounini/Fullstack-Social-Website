const express = require('express')
const Comment = require('../Database/Comments')
const {validateToken} = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.get('/:postId', async(req, res) => {
	const postId = req.params.postId
	const comment = await Comment.find({PostId: postId})
	res.json(comment)
})

router.post('/', validateToken, async (req, res) => {
	const comment = req.body
	const username = req.user.username
	comment.username = username
	await Comment.insertMany(comment)
	//  create and insertMany works for inputing values
	res.json(comment)
})

router.delete('/:commentId', validateToken, async(req, res) => {
	const commentId = req.params.commentId
	 try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }	
})

module.exports = router