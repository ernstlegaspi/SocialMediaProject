import './globals.css'

import Feed from '@/components/Feed'
import PostModal from '@/components/modals/PostModal'
import Sidebar from '@/components/Sidebar/Sidebar'
import Trendsbar from '@/components/Trendsbar/Trendsbar'

import getCurrentUser from '@/actions/getCurrentUser'

import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Social Media',
	description: 'Social Media Web Application',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const user = await getCurrentUser()
	
	if(!user) {
		return (
			<html lang="en">
				<body className={inter.className}>
					<Toaster />
					{children}
				</body>
			</html>
		)
	}
	
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster />
				<div className="bg-main-color flex justify-center w-full h-full">
					<Sidebar />
					<div className="border-x border-slate-700 w-[30%] flex justify-between">
						<div className="w-full h-full flex flex-col">
							{children}
						</div>
					</div>
					<Trendsbar />
					<PostModal />
				</div>
			</body>
		</html>
	)
}