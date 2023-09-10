import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser()

		if(!currentUser) return new NextResponse('User not logged in', { status: 401 })
		
		if(!currentUser?.firstName || !currentUser.tag) return new NextResponse('Invalid Credentials', { status: 401 })
		
		const _data = await request.json()

		const { body } = _data

		if(!body) return new NextResponse('No data provided', { status: 400 })
		
		const newPost = await prisma.post.create({
			data: {
				body,
				userId: currentUser.id,
				userName: currentUser.firstName + " " + currentUser.lastName,
				userTag: currentUser.tag,
				userImage: currentUser.image
			}
		})

		if(!newPost) return new NextResponse("Internal Server Error", { status: 500 })

		return NextResponse.json(newPost, { status: 201 })
	}
	catch(error: any) {
		return new NextResponse('Invalid Post', { status: 400 })
	}
}
