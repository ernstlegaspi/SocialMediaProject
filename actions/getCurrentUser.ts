import getSession from "./getSession";

import prisma from '@/libs/prismadb'

const getCurrentUser = async () => {
	const session = await getSession()

	if(!session?.user?.email) return null

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email
		}
	})

	if(!user) return null

	return user
}

export default getCurrentUser
