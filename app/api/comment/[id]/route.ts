import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

import { NextResponse } from 'next/server'

interface IParams {
	id: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		const user = await getCurrentUser()
	
		if(!user) return new NextResponse('User is not logged in', { status: 401 })
		
		const { id } = params

		const req = await request.json()

		const { body } = req

		if(!body) return new NextResponse('Invalid Request', { status: 400 })
		
		if(!id) return new NextResponse('Internal Server Error', { status: 500 })
		
		const newComment = await prisma.comment.create({
			data: {
				userId: user.id,
				postId: id,
				body,
				commentCount: 0,
				likeCount: 0,
				userName: user.firstName + " " + user.lastName,
				userTag: user.tag!,
				userImage: ''
			}
		})

		if(!newComment) return new NextResponse('Internal Server Error', { status: 500 })

		return NextResponse.json(newComment, { status: 201 })
	}
	catch(error: any) {
		return new NextResponse('Invalid Request', { status: 400 })
	}
}
