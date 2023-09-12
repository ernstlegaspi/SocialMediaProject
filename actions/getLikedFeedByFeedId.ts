import prisma from '@/libs/prismadb'

export default async function GET(postId: string) {
	try {
		if(!postId) return null

		const existingFeed = await prisma.likedFeeds.findFirst({
			where: {
				postId
			}
		})

		if(!existingFeed) return null
		
		return existingFeed
	}
	catch(error: any) {
		return null
	}
}
