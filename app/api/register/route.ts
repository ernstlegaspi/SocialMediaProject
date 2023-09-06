import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		const { firstName, lastName, email, password } = body

		if(!firstName || !lastName || !email || !password) return new Response("Invalid Credentials", { status: 400 })
		
		const hashedPassword = await bcrypt.hash(password, 12)

		if(!hashedPassword) return new Response("Internal Server Error", { status: 500 })
		
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if(user) return new Response("Email already existing", { status: 409 })
		
		const newUser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				hashedPassword
			}
		})

		if(!newUser) return new Response("Internal Server Error", { status: 500 })

		return NextResponse.json(newUser, { status: 201 })
	}
	catch(error: any) {
		console.log("Register Error")

		return new Response("Error Register", { status: 400 })
	}
}
