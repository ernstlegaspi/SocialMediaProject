import prisma from '@/libs/prismadb'

export default async function GET() {
	try {
		const feeds = await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})

		return feeds
	}
	catch(error: any) {
		return null
	}
}
