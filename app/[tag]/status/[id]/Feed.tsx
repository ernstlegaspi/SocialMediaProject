'use client'

import axios from 'axios'
import moment from 'moment'

import Link from 'next/link'

import Avatar from '@/components/Avatar'
import Feed from '@/components/Feed'
import Input from '@/components/Input'
import InteractButton from '@/components/InteractButton'

import { useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineFileGif } from 'react-icons/ai'
import { BiArrowBack, BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsBookmark, BsImage } from 'react-icons/bs'
import { IoChatboxOutline, IoLocationOutline } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'
import { PiSmileyBold } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Comment, Post } from '@prisma/client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"

interface FeedProps {
	comments: Comment[]
	isLikedByUser?: boolean
	likedFeedId?: string
	post: Post | undefined | null
}

const PageFeed = ({ post, likedFeedId, isLikedByUser, comments }: FeedProps) => {
	const [isCommentHovered, setIsCommentHovered] = useState(false)
	const [isHeartHovered, setIsHeartHovered] = useState(false)
	const [isBookmarkHovered, setIsBookmarkHovered] = useState(false)
	const [likeDisabled, setLikeDisabled] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const [comment, setComment] = useState('')
	const [isClicked, setIsClicked] = useState(false)
	const router = useRouter()

	const { register, handleSubmit, setValue } = useForm<FieldValues>({
		defaultValues: {
			body: ''
		}
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setDisabled(true)
		
		axios.post(`/api/comment/${post?.id}`, data)
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
		if((isClicked || isLikedByUser) && !likeDisabled) {
			setIsClicked(false)
			setLikeDisabled(true)
			
			axios.delete(`/api/like-post/${likedFeedId}`)
			.then(() => {
				setLikeDisabled(false)
				router.refresh()
			})
			.catch(() => {
				toast.error('Error removing like to this feed')
				setIsClicked(false)
				setLikeDisabled(false)
			})
			
			return
		}

		setIsClicked(true)
		setLikeDisabled(true)

		axios.post(`/api/like-post/${post?.id}`)
		.then(() => {
			setLikeDisabled(false)
			router.refresh()
		})
		.catch(() => {
			toast.error('Error liking this feed')
			setIsClicked(false)
			setLikeDisabled(false)
		})
	}
	
	useEffect(() => {
		if(isLikedByUser) setIsClicked(true)
	}, [])

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
						<p className="font-bold text-white">{}</p>
						<p className="text-slate-500 text-sm">@{post?.userTag}</p>
					</div>
				</div>
				<p className="mt-3 text-white">{post?.body}</p>
				<div className="text-sm mt-1 flex text-slate-500">
					<p>{moment(post?.createdAt).format('LT')}</p>
					<p>· {moment(post?.createdAt).format('LL')}</p>
				</div>
				<div className="mt-5 p-3 border-y border-slate-700 flex justify-between text-slate-500">
					<InteractButton count={post?.commentCount?.toString()! || "0"} onClick={() => {}} setHover={setIsCommentHovered} isBlue isHovered={isCommentHovered} icon={IoChatboxOutline} />
					<InteractButton count={post?.likeCount?.toString()! || "0"} isClicked={isClicked} onClick={handleLikeFeed} setHover={setIsHeartHovered} isHovered={isHeartHovered} icon={AiOutlineHeart} />
					<InteractButton count={"0"} onClick={() => {}} setHover={setIsBookmarkHovered} isYellow isHovered={isBookmarkHovered} icon={BsBookmark} />
					{/* <InteractButton count={post?.bookmarkCount?.toString()! || "0"} onClick={() => {}} setHover={setIsBookmarkHovered} isYellow isHovered={isBookmarkHovered} icon={BsBookmark} /> */}
				</div>
				<div className="w-full flex">
					<Link className="mt-4" href="/">
						<Avatar width={40} height={40} src={null} />
					</Link>
					<div className="ml-5 mt-5 w-full">
						<div className="flex justify-between items-center w-full">
							<p className="text-slate-500 text-[15px]">Replying to <span className="indigo-text">@{post?.userTag}</span></p>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="custom">
											<BiDotsHorizontalRounded size={20} />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56">
										<DropdownMenuItem>
											<div className="flex items-center">
												<MdDeleteOutline size={20} />
												<p className="ml-1 text-[17px]">Delete</p>
											</div>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
						</div>
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
					<Feed key={comment.id} dateTime={comment.createdAt} commentCount={post?.commentCount!} likeCount={comment.likeCount} tag={comment.userTag} name={comment.userName} body={comment.body} id={post?.id} />
				))}
			</div>
		</>
	)
}

export default PageFeed