'use client'

import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
	id: string
	disabled?: boolean
	fullWidth?: boolean
	placeholder: string
	type?: string
	register: UseFormRegister<FieldValues>
	required: boolean
}

const Input = ({ type = "text", disabled, fullWidth, id, placeholder, register, required }: InputProps) => {
	return (
		<input type={type} className={`bg-transparent ${fullWidth ? 'w-full' : 'w-1/2'} outline-none border-b border-main-color p-2`} id={id} { ...register(id, { required }) } disabled={disabled} placeholder={placeholder} />
	)
}

export default Input