import prisma from '@/libs/prismadb'

interface IParams {
	id: string
}

export default async function GET(params: IParams) {
	try {
		const { id } = params
		
		const feed = await prisma.post.findUnique({
			where: {
				id: id
			},
			include: {
				comments: true,
			}
		})

		if(!feed) return null

		return feed
	}
	catch(error: any) {
		return null
	}
}
