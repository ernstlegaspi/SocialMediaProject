'use client'

import Input from "../Input"

import Modal from "./Modal"
import UseLoginModal from "@/hooks/useLoginModal"
import UseRegisterModal from "@/hooks/useRegisterModal"

import { motion } from 'framer-motion'

const LoginModal = () => {
	const loginModal = UseLoginModal()
	const registerModal = UseRegisterModal()
	
	const bodyContent = (
		<>
			<Input fullWidth name="email" placeholder="Email" type="email" />
			<div className="mt-5"></div>
			<Input fullWidth name="password" placeholder="Password" type="password" />
			<div className="mt-7"></div>
		</>
	)

	const handleClick = () => {
		loginModal.onClose()
		registerModal.onOpen()
	}
	
	const reminderContent = (
		<>
			<p className="text-main-color text-sm mt-3">Don't have an account? <span onClick={handleClick} className="hover:text-black cursor-pointer underline italic">Register here</span></p>
		</>
	)

	if(!loginModal.isOpen) return null
	
	return (
		<motion.div transition={{ delay: 0, type: 'spring', damping: 10, stiffness: 150 }} initial={{ y: '-70vh' }} animate={{ y: '0' }} exit={{ y: '0' }}>
			<Modal bodyContent={bodyContent} reminderContent={reminderContent} label="Login" onClick={() => {}} onClickSocial={() => {}} />
		</motion.div>
	)
}

export default LoginModal