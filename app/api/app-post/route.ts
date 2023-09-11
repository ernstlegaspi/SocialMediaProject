import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

import { _201, _400, _401, _409, _500 } from '@/libs/constants'

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser()

		if(!currentUser) return _401()
		
		if(!currentUser?.firstName || !currentUser.tag) return _400()
		
		const _data = await request.json()

		const { body } = _data

		if(!body) return _400()
		
		const newPost = await prisma.post.create({
			data: {
				body,
				userId: currentUser.id,
				userName: currentUser.firstName + " " + currentUser.lastName,
				userTag: currentUser.tag,
				userImage: currentUser.image
			}
		})

		if(!newPost) return _500()

		return _201(newPost)
	}
	catch(error: any) {
		return _400()
	}
}
