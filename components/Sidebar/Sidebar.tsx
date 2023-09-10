'use client'

import Image from 'next/image'

import Navigation from './Navigation'
import UsePostModal from '@/hooks/usePostModal'

import { BiHomeAlt2 } from 'react-icons/bi'
import { LuSearch } from 'react-icons/lu'
import { AiOutlineBell } from 'react-icons/ai'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { BsPeople, BsBookmark, BsEnvelope, BsPerson } from 'react-icons/bs'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
	const usePostModal = UsePostModal()
	const router = useRouter()

	const handleSignOut = () => {
		router.push('/')
		signOut()
	}
	
	return (
		<div className="h-full pl-3 w-[250px] relative">
			<div className="cursor-pointer w-[25%]" onClick={() => router.push('/')}>
				<Image className="mt-5 ml-2" alt="Bird" width={50} height={50} src={'/img/logo.png'} />
			</div>
			<Navigation icon={BiHomeAlt2} label="Home" onClick={() => {}} />
			<Navigation icon={LuSearch} label="Search" onClick={() => {}} />
			<Navigation icon={AiOutlineBell} label="Notifications" onClick={() => {}} />
			<Navigation icon={BsEnvelope} label="Messages" onClick={() => {}} />
			<Navigation icon={HiOutlineClipboardList} label="Lists" onClick={() => {}} />
			<Navigation icon={BsBookmark} label="Bookmarks" onClick={() => {}} />
			<Navigation icon={BsPeople} label="Communities" onClick={() => {}} />
			<Navigation icon={BsPerson} label="Profile" onClick={() => {}} />
			<div className="w-full pl-2 pr-5">
				<button onClick={usePostModal.onOpen} className="customize-button mt-6 p-2 w-full">Post</button>
			</div>
			<button className="p-5 py-3 rounded-full w-[85%] text-white post-button-color absolute left-5 bottom-5" onClick={handleSignOut}>Logout</button>
		</div>
	)
}

export default Sidebar