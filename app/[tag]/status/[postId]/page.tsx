'use client'

import Avatar from '@/components/Avatar'
import InteractButton from '@/components/InteractButton'
import Link from 'next/link'

import { useState } from 'react'
import { AiOutlineHeart, AiOutlineFileGif } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { BsBookmark, BsImage } from 'react-icons/bs'
import { IoChatboxOutline, IoLocationOutline } from 'react-icons/io5'
import { PiSmileyBold } from 'react-icons/pi'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/components/Input'
import Feed from '@/components/Feed'

const Page = () => {
	const [isCommentHovered, setIsCommentHovered] = useState(false)
	const [isHeartHovered, setIsHeartHovered] = useState(false)
	const [isBookmarkHovered, setIsBookmarkHovered] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const [comment, setComment] = useState('')

	const { register, handleSubmit, setValue } = useForm<FieldValues>({
		defaultValues: {
			comment: ''
		}
	})
	
	return (
		<>
			<div className="p-5">
				<div className="flex items-center text-white mb-5">
					<BiArrowBack size={20} />
					<p className="ml-5 font-bold text-xl">Post</p>
				</div>
				<div className="flex">
					<Avatar width={40} height={40} src={null} />
					<div className="flex flex-col ml-5">
						<p className="font-bold text-white">Frances Barzo</p>
						<p className="text-slate-500 text-sm">@1francesbarzo</p>
					</div>
				</div>
				<p className="mt-3 text-white">Ang sad. Hahahahahahahaha shet</p>
				<div className="text-sm mt-1 flex text-slate-500">
					<p>5:03 PM</p>
					<p>· Apr 25, 2023</p>
				</div>
				<div className="mt-5 p-3 border-y border-slate-700 flex justify-between text-slate-500">
					<InteractButton setHover={setIsCommentHovered} isBlue isHovered={isCommentHovered} icon={IoChatboxOutline} />
					<InteractButton setHover={setIsHeartHovered} isBlue isHovered={isHeartHovered} icon={AiOutlineHeart} />
					<InteractButton setHover={setIsBookmarkHovered} isBlue isHovered={isBookmarkHovered} icon={BsBookmark} />
				</div>
				<div className="w-full flex">
					<Link className="mt-4" href="/">
						<Avatar width={40} height={40} src={null} />
					</Link>
					<div className="ml-5 mt-5 w-full">
						<p className="text-slate-500 text-[15px]">Replying to <span className="indigo-text">@!francesbarzo</span></p>
						<Input value={comment} setPostBody={setComment} placeholder="Post your reply!" register={register} id="comment" isTextarea required />
						<div className="flex items-center justify-between">
							<div className="flex justify-between customize-text">
								<BsImage className="cursor-pointer" size={20} />
								<AiOutlineFileGif className="cursor-pointer mx-5" size={20} />
								<PiSmileyBold className="cursor-pointer mr-5" size={20} />
								<IoLocationOutline className="cursor-pointer" size={20} />
							</div>
								<button disabled={comment == '' || disabled} className={`${comment == '' || disabled ? 'disabled-button' : 'customize-button'} p-[5px] w-[80px]`}>Reply</button>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-slate-700 w-full h-[1px]"></div>
			<div className="feed-scroll h-full w-full overflow-y-auto">
				{/* put all the comments here */}
			</div>
		</>
	)
}

export default Page