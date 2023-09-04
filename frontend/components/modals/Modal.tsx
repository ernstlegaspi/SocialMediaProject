'use client'

import Button from "../Button"
import Input from "../Input"

import { BiLogoFacebook } from 'react-icons/bi'
import { AiOutlineGoogle } from 'react-icons/ai'

interface ModalProps {
	bodyContent: React.ReactElement
	reminderContent: React.ReactElement
	label: string
	onClick: () => void
	onClickSocial: () => void
}

const Modal = ({ bodyContent, reminderContent, label, onClick, onClickSocial }: ModalProps) => {
	return (
		<>
			{ bodyContent }
			<Button fullWidth label={label} onClick={onClick} />
			{ reminderContent }
			<div className="my-7 relative flex justify-center">
				<p className="rounded-[100%] text-center bg-white w-10 relative z-10 text-main-color">or</p>
				<div className="absolute top-[55%] h-[1px] w-full bg-main-color"></div>
			</div>
			<Button icon={AiOutlineGoogle} fullWidth label={`${label} using Google`} onClick={onClickSocial} />
			<div className="mt-5"></div>
			<Button icon={BiLogoFacebook} fullWidth label={`${label} using Facebook`} onClick={onClickSocial} />
		</>
	)
}

export default Modal