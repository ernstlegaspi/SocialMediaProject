import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import UserModel from '../model/user'

const jwtSign = (id: any) => jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { firstName, lastName, password, tag, email } = req.body

		if(!firstName || !lastName || !password || !tag || !email) return res.status(400).json({ message: 'Invalid Credentials' })

		const user = await UserModel.findOne({ email })

		if(user && user.email) return res.status(409).json({ message: 'Email is already used' })

		const hashedPassword = await bcrypt.hash(password, 12)

		if(!hashedPassword) return res.status(500).json({ message: "Server error" })

		const newUser = await UserModel.create({ firstName, lastName, email, tag, password: hashedPassword })
		const token = jwtSign(newUser._id)

		return res.status(201).json({ token })
	}
	catch(error: any) {
		console.log(`Error in register ${error}`)

		res.status(400).json({ message: error.message })
	}
}

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body

		if(!email || !password) return res.status(400).json({ messsage: 'Invalid Credentials' })

		const user = await UserModel.findOne({ email })

		if(!user) return res.status(400).json({ messsage: 'No user found' })

		const comparePassword = await bcrypt.compare(password, user.password)

		if(!comparePassword) return res.status(400).json({ messsage: 'Password is not the same' })

		const token = jwtSign(user._id)

		return res.status(200).json({ token })
	}
	catch(error: any) {
		console.log(`Error in login ${error}`)

		res.status(400).json({ message: error.message })
	}
}
