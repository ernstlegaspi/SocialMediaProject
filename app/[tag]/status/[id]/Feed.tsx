'use client'

import axios from 'axios'
import moment from 'moment'

import Link from 'next/link'

import Avatar from '@/components/Avatar'
import Feed from '@/components/Feed'
import Input from '@/components/Input'
import InteractButton from '@/components/InteractButton'

import { useState } from 'react'
import { AiOutlineHeart, AiOutlineFileGif } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { BsBookmark, BsImage } from 'react-icons/bs'
import { IoChatboxOutline, IoLocationOutline } from 'react-icons/io5'
import { PiSmileyBold } from 'react-icons/pi'
import { useRouter } from 'next/navigation'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Comment } from '@prisma/client'

interface FeedProps {
	id: string,
	userName: string
	userTag: string
	body: string
	userImage?: string
	likeCount?: number
	commentCount?: number
	dateTime: Date
	comments: Comment[]
}

const PageFeed = ({ id, userName, userTag, body, userImage, commentCount, likeCount, dateTime, comments }: FeedProps) => {
	const [isCommentHovered, setIsCommentHovered] = useState(false)
	const [isHeartHovered, setIsHeartHovered] = useState(false)
	const [isBookmarkHovered, setIsBookmarkHovered] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const [comment, setComment] = useState('')
	const router = useRouter()

	const { register, handleSubmit, setValue } = useForm<FieldValues>({
		defaultValues: {
			body: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setDisabled(true)
		
		axios.post(`/api/comment/${id}`, data)
		.then(() => {
			setDisabled(false)
			setValue('body', '', { shouldValidate: true })
			router.refresh()
		})
		.catch(() => {
			setDisabled(false)
		})
	}

	const handleLikeFeed = () => {
		axios.post(`/api/like-post/${id}`)
		.then(() => alert(1))
		.catch(() => alert(2))
	}
	
	return (
		<>
			<div className="p-5">
				<div className="flex items-center text-white mb-5">
					<BiArrowBack className="cursor-pointer" onClick={() => router.push('/')} size={20} />
					<p className="ml-5 font-bold text-xl">Post</p>
				</div>
				<div className="flex">
					<Avatar width={40} height={40} src={null} />
					<div className="flex flex-col ml-5">
						<p className="font-bold text-white">{userName}</p>
						<p className="text-slate-500 text-sm">@{userTag}</p>
					</div>
				</div>
				<p className="mt-3 text-white">{body}</p>
				<div className="text-sm mt-1 flex text-slate-500">
					<p>{moment(dateTime).format('LT')}</p>
					<p>· {moment(dateTime).format('LL')}</p>
				</div>
				<div className="mt-5 p-3 border-y border-slate-700 flex justify-between text-slate-500">
					<InteractButton onClick={() => {}} setHover={setIsCommentHovered} isBlue isHovered={isCommentHovered} icon={IoChatboxOutline} />
					<InteractButton onClick={handleLikeFeed} setHover={setIsHeartHovered} isHovered={isHeartHovered} icon={AiOutlineHeart} />
					<InteractButton onClick={() => {}} setHover={setIsBookmarkHovered} isYellow isHovered={isBookmarkHovered} icon={BsBookmark} />
				</div>
				<div className="w-full flex">
					<Link className="mt-4" href="/">
						<Avatar width={40} height={40} src={null} />
					</Link>
					<div className="ml-5 mt-5 w-full">
						<p className="text-slate-500 text-[15px]">Replying to <span className="indigo-text">@{userTag}</span></p>
						<Input value={comment} setPostBody={setComment} placeholder="Post your reply!" register={register} id="body" isTextarea required disabled={disabled} />
						<div className="flex items-center justify-between">
							<div className="flex justify-between customize-text">
								<BsImage className="cursor-pointer" size={20} />
								<AiOutlineFileGif className="cursor-pointer mx-5" size={20} />
								<PiSmileyBold className="cursor-pointer mr-5" size={20} />
								<IoLocationOutline className="cursor-pointer" size={20} />
							</div>
							<form onSubmit={handleSubmit(onSubmit)}>
								<button disabled={comment == '' || disabled} className={`${comment == '' || disabled ? 'disabled-button' : 'customize-button'} p-[5px] w-[80px]`}>Reply</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-slate-700 w-full h-[1px]"></div>
			<div className={`${comments.length < 4 ? '' : 'feed-scroll'} overflow-y-auto h-full w-full`}>
				{comments?.map(comment => (
					<Feed dateTime={comment.createdAt} commentCount={commentCount!} likeCount={comment.likeCount} tag={comment.userTag} name={comment.userName} body={comment.body} id={id} />
				))}
			</div>
		</>
	)
}

export default PageFeed