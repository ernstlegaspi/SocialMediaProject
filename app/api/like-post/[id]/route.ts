import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

import { _201, _400, _401, _500 } from '@/libs/constants'

interface IParams {
	id: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser()
		
		if(!currentUser) return _401()

		const { id } = params
		
		const newLikedPost = await prisma.likedFeeds.create({
			data: {
				userId: currentUser.id,
				postId: id
			}
		})

		if(!newLikedPost) return _500()

		return _201(newLikedPost)
	}
	catch(error: any) {
		return _400()
	}
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser()

		if(!currentUser) return _401()

		const { id } = params

		const postToDelete = await prisma.likedFeeds.deleteMany({
			where: {
				id,
				userId: currentUser.id
			}
		})

		if(!postToDelete) return _400()

		return _201(postToDelete)
	}
	catch(error: any) {
		return _400()
	}
}
