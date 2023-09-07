'use client'

import UsePostModal from "@/hooks/usePostModal"
import Avatar from "../Avatar"
import axios from 'axios'
import Input from '../Input'

import { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { CgImage } from 'react-icons/cg'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const PostModal = () => {
	const [isModalHovered, setIsModalHovered] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const [postBody, setPostBody] = useState('')
	const usePostModal = UsePostModal()
	const router = useRouter()

	const { register, handleSubmit, setValue } = useForm<FieldValues>({
		defaultValues: {
			body: ''
		}
	})
	
	if(!usePostModal.isOpen) return null
	
	const handleClick = () => {
		if(isModalHovered) return

		usePostModal.onClose()
	}	

	const onSubmit: SubmitHandler<FieldValues> = data => {
		if(postBody == '') {
			alert(1)
			return
		}
		
		setDisabled(true)
		
		axios.post(`/api/app-post`, data)
		.then(() => {
			router.refresh()
			setDisabled(false)
			setValue('body', '', { shouldValidate: true })
			usePostModal.onClose()
		})
	}

	return (
		<div onClick={handleClick} className="absolute inset-0 bg-white/10 flex justify-center">
			<div onMouseEnter={() => setIsModalHovered(true)} onMouseLeave={() => setIsModalHovered(false)} className="bg-main-color mt-[46px] w-[600px] h-[315px] rounded-2xl flex flex-col justify-between">
				<div onClick={usePostModal.onClose} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`${isHovered ? 'hover:bg-white/10' : 'bg-transparent'} cursor-pointer ml-5 mt-5 text-white w-fit p-[5px] rounded-full transition all`}>
					<IoCloseSharp size={20} />
				</div>
				<div className="w-full p-5 flex h-full">
					<div className="mr-5">
						<Avatar width={40} height={40} src={null} />
					</div>
					<Input setPostBody={setPostBody} placeholder="What is happening?!" register={register} id="body" isTextarea required />
				</div>
				<div className="w-full px-4">
					<div className="border-t border-slate-700 flex items-center justify-between mb-3 pt-3">
						<div className="indigo-text">
							<CgImage size={24} />
						</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<button disabled={postBody == '' || disabled} className={`${postBody == '' || disabled ? 'disabled-button' : 'customize-button'} p-[5px] w-[80px]`}>Post</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostModal