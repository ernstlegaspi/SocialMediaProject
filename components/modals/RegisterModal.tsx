'use client'

import axios from 'axios'
import AuthModal from "./AuthModal"
import UseLoginModal from "@/hooks/useLoginModal"
import UseRegisterModal from "@/hooks/useRegisterModal"

import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Button from '../Button'
import Input from '../Input'

const RegisterModal = () => {
	const loginModal = UseLoginModal()
	const registerModal = UseRegisterModal()
	const [disabled, setDisabled] = useState(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setDisabled(true)
		
		axios.post(`/api/register`, data)
		.then(() => {
			signIn('credentials', { ...data, redirect: false })
			.then(() => router.refresh())
		})
		.catch((error: any) => {
			toast.error(error.response.data)
			
			setDisabled(false)
		})
	}
	
	const bodyContent = (
		<>
			<div className="flex justify-between mb-5">
				<div className="mr-1">
					<Input required fullWidth disabled={disabled} placeholder="First Name" id="firstName" register={register} />
				</div>
				<div className="ml-1">
					<Input required fullWidth disabled={disabled} placeholder="Last Name" id="lastName" register={register} />
				</div>
			</div>
				<Input fullWidth required disabled={disabled} placeholder="Email" id="email" type="email" register={register} />
			<div className="mt-5"></div>
				<Input fullWidth required disabled={disabled} placeholder="Password" id="password" type="password" register={register} />
			<div className="mt-7"></div>
			<Button isSubmit onClick={() => {}} disabled={disabled} fullWidth label="Register" />
		</>
	)

	const handleClick = () => {
		if(disabled) return
		
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<AuthModal disabled={disabled} bodyContent={bodyContent} reminderContent={reminderContent} label="Register" onClickSocial={() => {}} />
			</form>
		</motion.div>
	)
}

export default RegisterModal