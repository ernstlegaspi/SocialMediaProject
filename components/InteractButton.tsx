'use client'

import { IconType } from 'react-icons'

interface InteractButtonProps {
	setHover: any
	isBlue?: boolean
	isYellow?: boolean
	isHovered: boolean
	icon: IconType
	count?: string
	onClick: () => void
	isClicked?: boolean
}

const InteractButton = ({ isClicked, onClick, isYellow, setHover, isBlue, isHovered, icon: Icon, count }: InteractButtonProps) => {
	return (
		<>
			<div onClick={onClick} onMouseEnter={() => setHover((val: boolean) => !val)} onMouseLeave={() => setHover((val: boolean) => !val)} className="text-gray-500 flex items-center mr-10">
				<div className={`cursor-pointer ${isHovered ? `${isYellow ? 'bg-yellow-600/20' : isBlue ? 'bg-sky-300/10' : 'bg-red-400/20'}` : ''} py-[5px] px-[6px] rounded-full`}>
					<Icon color={`${isClicked ? 'red' : isHovered ? `${isYellow ? 'yellow' : isBlue ? 'lightblue' : 'red'}` : ''}`} size={20} />
				</div>
				<span className={`${isClicked ? 'red' : isHovered ? `${isYellow ? 'bg-yellow-300' : isBlue ? 'blue' : 'red'}` : ''} ml-2`}>{count}</span>
			</div>
		</>
	)
}

export default InteractButton