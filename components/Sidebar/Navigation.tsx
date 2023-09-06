'use client'

import { useState } from 'react'
import { IconType } from 'react-icons'

interface NavigationProps {
	icon: IconType
	label: string
	onClick: () => void
}

const Navigation = ({ icon: Icon, label, onClick }: NavigationProps) => {
	const [mouseEnter, setMouseEnter] = useState(false)
	
	return (
		<div onMouseEnter={() => setMouseEnter(prev => !prev)} onMouseLeave={() => setMouseEnter(prev => !prev)} className='cursor-pointer'>
			<div onClick={onClick} className={`${mouseEnter ? 'bg-slate-500/25' : ''} mt-5 py-[6px] pl-2 
				pr-5 w-fit rounded-full flex items-center justify-start text-white`}>
				<Icon size={25} className="mr-4" />
				<span className="text-lg">{ label }</span>
			</div>
		</div>
	)
}

export default Navigation