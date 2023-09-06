'use client'

import { IconType } from "react-icons"

interface ButtonProps {
	onClick: () => void
	disabled?: boolean
	label: string
	fullWidth?: boolean
	icon?: IconType
	isSubmit?: boolean
}

const Button = ({ isSubmit, disabled, onClick, label, fullWidth, icon: Icon }: ButtonProps) => {
	return (
		<button type={isSubmit ? 'submit' : 'button'} onClick={onClick} disabled={disabled} className={`${disabled ? '' : 'hover:bg-black'} transition-all duration-500 ease-in-out button-text-white ${fullWidth ? 'w-full' : ''} ${disabled ? 'bg-slate-400' : 'bg-main-color'} text-white rounded px-2 py-3 flex items-center justify-center`}>
			{label}
			{Icon && (
				<Icon className="ml-2" size={22} />
			)}
		</button>
	)
}

export default Button