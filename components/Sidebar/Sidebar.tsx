'use client'

import Image from 'next/image'
import Link from 'next/link'

import Navigation from './Navigation'
import UsePostModal from '@/hooks/usePostModal'

import { BsPerson } from 'react-icons/bs'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
	const usePostModal = UsePostModal()
	
	return (
		<div className="h-full pl-3 w-[250px] relative">
			<div className="w-[25%]">
				<Link className="w-full" href="/">
					<Image className="mt-5 ml-2" alt="Bird" width={55} height={55} src={'/img/logo.png'} />
				</Link>
			</div>
			<Navigation icon={BsPerson} label="Profile" onClick={() => {}} />
			<div className="w-full pl-2 pr-5">
				<button onClick={usePostModal.onOpen} className="customize-button mt-6 p-2 w-full">Post</button>
			</div>
			<button className="p-5 py-3 rounded-full w-[85%] text-white post-button-color absolute left-5 bottom-5" onClick={() => signOut()}>Logout</button>
		</div>
	)
}

export default Sidebar