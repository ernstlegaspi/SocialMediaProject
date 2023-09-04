'use client'

import { IconType } from "react-icons"

interface ButtonProps {
	onClick: () => void
	type?: string
	disabled?: boolean
	label: string
	fullWidth?: boolean
	icon?: IconType
}

const Button = ({ disabled, onClick, type, label, fullWidth, icon: Icon }: ButtonProps) => {
	return (
		<button onClick={onClick} disabled={disabled} className={`hover:bg-black transition-all duration-500 ease-in-out button-text-white ${fullWidth ? 'w-full' : ''} text-white bg-main-color rounded px-2 py-3 flex items-center justify-center`}>
			{label}
			{Icon && (
				<Icon className="ml-2" size={22} />
			)}
		</button>
	)
}

export default Button