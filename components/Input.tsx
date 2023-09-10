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
	isTextarea?: boolean
	setPostBody?: (value: string) => void
	value?: string
}

const Input = ({ setPostBody, isTextarea, type = "text", value, disabled, fullWidth, id, placeholder, register, required }: InputProps) => {
	return (
		<>
			{isTextarea ? (
				<textarea id={id} { ...register(id, { required }) } className={`${value!.length >= 223 ? 'feed-scroll' : ''} w-full mt-3 text-xl bg-transparent resize-none outline-none placeholder:text-slate-400/80 text-white`} placeholder={placeholder} onChange={e => setPostBody!(e.target.value)}></textarea>
			) : (
				<input type={type} className={`bg-transparent ${fullWidth ? 'w-full' : 'w-1/2'} outline-none border-b border-main-color p-2`} id={id} { ...register(id, { required }) } disabled={disabled} placeholder={placeholder} />
			)}
		</>
	)
}

export default Input