import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'

import { _201, _400, _409, _500 } from '@/libs/constants'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		const { firstName, lastName, email, password } = body

		if(!firstName || !lastName || !email || !password) return _400()
		
		const hashedPassword = await bcrypt.hash(password, 12)

		if(!hashedPassword) return _500()
		
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if(user) return _409('Email already existing')
		
		const newUser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				hashedPassword,
				tag: `${firstName}${lastName}`,
				image: ""
			}
		})

		if(!newUser) return _500()

		return _201(newUser)
	}
	catch(error: any) {
		console.log("Register Error")

		return _400()
	}
}
