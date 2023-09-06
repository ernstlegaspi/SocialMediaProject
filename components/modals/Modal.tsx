'use client'

import Button from "../Button"

import { BiLogoFacebook } from 'react-icons/bi'
import { AiOutlineGoogle } from 'react-icons/ai'

interface ModalProps {
	bodyContent: React.ReactElement
	reminderContent: React.ReactElement
	label: string
	onClickSocial: () => void
	disabled?: boolean
}

const Modal = ({ disabled, bodyContent, reminderContent, label, onClickSocial }: ModalProps) => {
	return (
		<>
			{ bodyContent }
			{ reminderContent }
			<div className="my-7 relative flex justify-center">
				<p className="rounded-[100%] text-center bg-white w-10 relative z-10 text-main-color">or</p>
				<div className="absolute top-[55%] h-[1px] w-full bg-main-color"></div>
			</div>
			<Button disabled={disabled} icon={AiOutlineGoogle} fullWidth label={`${label} using Google`} onClick={onClickSocial} />
			<div className="mt-5"></div>
			<Button disabled={disabled} icon={BiLogoFacebook} fullWidth label={`${label} using Facebook`} onClick={onClickSocial} />
		</>
	)
}

export default Modal