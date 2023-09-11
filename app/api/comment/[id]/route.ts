import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

import { _201, _400, _401, _409, _500 } from '@/libs/constants'

interface IParams {
	id: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		const user = await getCurrentUser()
	
		if(!user) return _401()
		
		const { id } = params

		const req = await request.json()

		const { body } = req

		if(!body) return _400()
		
		if(!id) return _500()
		
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

		if(!newComment) return _500()
		return _201(newComment)
	}
	catch(error: any) {
		return _400()
	}
}
