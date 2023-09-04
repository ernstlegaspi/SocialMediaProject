'use client'

import Input from "../Input"

import Modal from "./Modal"
import UseLoginModal from "@/hooks/useLoginModal"
import UseRegisterModal from "@/hooks/useRegisterModal"

import { motion } from 'framer-motion'

const RegisterModal = () => {
	const loginModal = UseLoginModal()
	const registerModal = UseRegisterModal()
	
	const bodyContent = (
		<>
			<div className="flex justify-between mb-5">
				<div className="mr-1">
					<Input fullWidth name="firstName" placeholder="First Name" />
				</div>
				<div className="ml-1">
					<Input fullWidth name="lastName" placeholder="Last Name" />
				</div>
			</div>
			<Input fullWidth name="email" placeholder="Email" type="email" />
			<div className="mt-5"></div>
			<Input fullWidth name="password" placeholder="Password" type="password" />
			<div className="mt-7"></div>
		</>
	)

	const handleClick = () => {
		loginModal.onOpen()
		registerModal.onClose()
	}
	
	const reminderContent = (
		<>
			<p className="text-main-color text-sm mt-3">Already have an account? <span onClick={handleClick} className="hover:text-black cursor-pointer underline italic">Login here</span></p>
		</>
	)

	if(!registerModal.isOpen) return null
	
	return (
		<motion.div transition={{ delay: 0, type: 'spring', damping: 10, stiffness: 150 }} initial={{ y: '-70vh' }} animate={{ y: '0' }} exit={{ y: '0' }}>
			<Modal bodyContent={bodyContent} reminderContent={reminderContent} label="Register" onClick={() => {}} onClickSocial={() => {}} />
		</motion.div>
	)
}

export default RegisterModal