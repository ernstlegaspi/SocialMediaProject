'use client'

import Image from 'next/image'
import Link from 'next/link'

import { signOut } from 'next-auth/react'
import Navigation from './Navigation'

import { BsPerson } from 'react-icons/bs'

const Sidebar = () => {
	
	return (
		<div className="h-full pl-3 w-[250px] relative">
			<div className="w-[25%]">
				<Link className="w-full" href="/">
					<Image className="mt-5 ml-2" alt="Bird" width={55} height={55} src={'/img/logo.png'} />
				</Link>
			</div>
			<Navigation icon={BsPerson} label="Profile" onClick={() => {}} />
			<div className="w-full pl-2 pr-5">
				<button className="transition-all hover:bg-indigo-800 mt-6 p-2 text-white post-button-color rounded-full w-full">Post</button>
			</div>
			<button className="p-5 py-3 rounded-full w-[85%] text-white post-button-color absolute left-5 bottom-5" onClick={() => signOut()}>Logout</button>
		</div>
	)
}

export default Sidebar