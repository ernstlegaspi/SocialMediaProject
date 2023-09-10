'use client'

import { IconType } from 'react-icons'

interface InteractButtonProps {
	setHover: any
	isBlue?: boolean
	isHovered: boolean
	icon: IconType
	count?: string
}

const InteractButton = ({ setHover, isBlue, isHovered, icon: Icon, count }: InteractButtonProps) => {
	return (
		<>
			<div onMouseEnter={() => setHover((val: boolean) => !val)} onMouseLeave={() => setHover((val: boolean) => !val)} className="text-gray-500 flex items-center mr-10">
				<div className={`cursor-pointer ${isHovered ? `${isBlue ? 'bg-sky-300/10' : 'bg-red-400/20'}` : ''} py-[5px] px-[6px] rounded-full`}>
					<Icon color={`${isHovered ? `${isBlue ? 'lightblue' : 'red'}` : ''}`} size={20} />
				</div>
				<span className={`${isHovered ? `${isBlue ? 'blue' : 'red'}` : ''} ml-2`}>{count}</span>
			</div>
		</>
	)
}

export default InteractButton