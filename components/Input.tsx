'use client'

interface InputProps {
	name: string
	disabled?: boolean
	fullWidth?: boolean
	placeholder: string
	type?: string
}

const Input = ({ type = "text", disabled, fullWidth, name, placeholder }: InputProps) => {
	return (
		<input type={type} className={`bg-transparent ${fullWidth ? 'w-full' : 'w-1/2'} outline-none border-b border-main-color p-2`} name={name} disabled={disabled} placeholder={placeholder} />
	)
}

export default Input