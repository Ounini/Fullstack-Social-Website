const express = require('express')
const User = require('../Database/Users')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const {validateToken} = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.post('/', async (req, res) => {
	const {username, password} = req.body
	bcrypt.hash(password, 10).then((hash) => {
		User.create({
			username: username,
			password: hash
		})
		res.json('SUCCESS')
	})
})

router.post('/login', async (req, res) => {
	const {username, password} = req.body

	const user = await User.findOne({username: username})
	
	if (!user) res.json({error: "User doesn't exist "}) 
	
	bcrypt.compare(password, user.password).then(async (match) => {
		if (!match) res.json({error: "Wrong Username And Password Combination"})
		
		const accessToken = sign(
			{username: user.username, id: user.id},
			'importantsecret'
		)
		res.json({token: accessToken, username: username, id: user.id})
	})
})

router.get('/user', validateToken, (req, res) => {
	res.json(req.user)
})

router.get('/basicinfo/:id', async (req, res) => {
	const id = req.params.id
	try {
		const basicInfo = await User.findById(id).select('-password')
		res.json(basicInfo)
	} catch (error) {
		console.error('Error in fetching User by id:', error)
		res.status(500).json({error: 'Internal Server Error'})
	}
})

router.put('/changePassword', validateToken, async (req, res) => {
	const {oldPassword, newPassword} = req.body
	try {
		const user = await User.findOne({username: req.user.username})
		if (!user) {
			return res.status(400).json({error: 'User not found'})
		}
		bcrypt.compare(oldPassword, user.password, async (err, isMatch) => {
			if (err) {
				return res.status(500).json({error: "Internal Server Error"})
			}
			if (!isMatch) {
				return res.status(400).json({error: 'Wrong Password Entered!'})
			}

			const hashedPassword = await bcrypt.hash(newPassword, 10)
			await User.updateOne({username: req.user.username}, {password: hashedPassword})
			return res.json({message: 'Passowrd successfully changed'})
		})
	} catch (error) {
		console.error('Error in changing Password:', error)
		res.status(500).json({ error: 'Internal Server Error'})
	}
})

module.exports = router