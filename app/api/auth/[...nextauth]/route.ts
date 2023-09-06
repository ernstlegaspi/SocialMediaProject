import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '@/libs/prismadb'

import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: '/'
	},
	debug: process.env.NODE_ENV === 'development',
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				if(!credentials) throw new Error('Invalid Credentials')

				if(!credentials.email) throw new Error('Invalid email')
				
				if(!credentials.password) throw new Error('Invalid password')

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				if(!user || !user?.hashedPassword) throw new Error('Invalid User credentials')

				const hashedPassword = bcrypt.compare(user.hashedPassword, credentials.password)

				if(!hashedPassword) throw new Error('Password does not match')
				
				return user
			}
		})
	],
	callbacks: {
		async jwt({ token, session }) {
			return { ...token, session }
		},
		async session({ session, token }) {
			return session
		}
	}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
