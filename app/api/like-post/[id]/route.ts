import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

import { _201, _400, _401, _409, _500 } from '@/libs/constants'

interface IParams {
	id: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		const currentUser = await getCurrentUser()
		
		if(!currentUser) return _401()

		const { id } = params

		const existingLikedPost = await prisma.likedFeeds.findFirst({
			where: {
				postId: id
			}
		})

		if(existingLikedPost) return _409("Existing")
		
		const newLikedPost = await prisma.likedFeeds.create({
			data: {
				userId: currentUser.id,
				postId: id
			}
		})

		if(!newLikedPost) return _500()

		const updatedFeed = await prisma.post.update({
			where: {
				id
			},
			data: {
				likeCount: {
					increment: 1
				}
			}
		})

		return _201(updatedFeed)
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

		const updatedFeed = await prisma.post.update({
			where: {
				id
			},
			data: {
				likeCount: {
					decrement: 1
				}
			}
		})

		return _201(updatedFeed)
	}
	catch(error: any) {
		return _400()
	}
}
