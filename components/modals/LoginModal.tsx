'use client'

import Modal from "./Modal"
import UseLoginModal from "@/hooks/useLoginModal"
import UseRegisterModal from "@/hooks/useRegisterModal"

import { useState } from 'react'
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import Button from '../Button'
import Input from '../Input'

const LoginModal = () => {
	const loginModal = UseLoginModal()
	const registerModal = UseRegisterModal()
	const router = useRouter()
	const [disabled, setDisabled] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setDisabled(true)
		
		signIn('credentials', { ...data, redirect: false })
		.then(() => router.refresh())
	}

	const bodyContent = (
		<>
			<Input required fullWidth disabled={disabled} placeholder="Email" id="email" register={register} />
			<div className="mt-5"></div>
			<Input required fullWidth disabled={disabled} placeholder="Password" id="password" register={register} />
			<div className="mt-7"></div>
			<Button isSubmit onClick={() => {}} disabled={disabled} fullWidth label="Register" />
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal disabled={disabled} bodyContent={bodyContent} reminderContent={reminderContent} label="Login" onClickSocial={() => {}} />
			</form>
		</motion.div>
	)
}

export default LoginModal