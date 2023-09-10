import prisma from '@/libs/prismadb'

import getCurrentUser from '@/actions/getCurrentUser'

export default async function GET() {
	try {
		const currentUser = await getCurrentUser()
		
		if(!currentUser) return null
		
		const feeds = await prisma.post.findMany({
			where: {
				userId: currentUser.id
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		if(!feeds) return null
		
		return feeds
	}
	catch(error: any) {
		return null
	}
}
