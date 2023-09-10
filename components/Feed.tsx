'use client'

import Link from 'next/link'
import Avatar from './Avatar'
import moment from 'moment'

import { AiOutlineHeart } from 'react-icons/ai'
import { IoChatboxOutline } from 'react-icons/io5'
import { IconType } from 'react-icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { Post } from '@prisma/client'
import InteractButton from './InteractButton'

interface FeedProps {
	avatar?: string
	body?: string
	commentCount: number | null
	image?: string
	likeCount: number | null
	name: string | undefined | null
	tag: string | null
	time?: Date
	post: Post
}

const Feed = ({ avatar, body, commentCount, image, likeCount, name, tag, time, post }: FeedProps) => {
	const [isCommentHovered, setIsCommentHovered] = useState(false)
	const [isHeartHovered, setIsHeartHovered] = useState(false)
	const router = useRouter()

	return (
		<div onClick={() => router.push(`/${tag}/status/${post.id}`)} className="hover:bg-slate-500/5 cursor-pointer p-5 border-b border-slate-700 w-full">
			<div className="flex">
				<div className="flex justify-end w-[10%] h-full">
					<Link href="/">
						<Avatar height={40} width={40} src={null} />
					</Link>
				</div>
				<div className="w-[90%] flex flex-col ml-5">
					<div className="flex items-center">
						<p className="hover:underline font-bold text-white">{name}</p>
						<p className="text-sm mx-1 text-gray-500">· @{tag} ·</p>
						<p className="text-sm text-gray-500">
							{/* {moment(time).fromNow()} */}
							{moment(time).fromNow().includes("seconds ago") ? "now" 
							: moment(time).fromNow().includes("a day ago") ? "1 day ago"
							: moment(time).fromNow().includes("a minute") ? "1 minute ago"
							: moment(time).fromNow().includes("an hour ago") ? "1 hour ago" 
							: moment(time).fromNow().includes("a day ago") ? "1 day ago" 
							: moment(time).fromNow().includes("days ago") ? moment(time).format("MMM Do") 
							: `${moment(time).fromNow().split(" ")[0]}m`}
						</p>
					</div>
					<p className="mt-1 text-white/80 text-sm w-[100%]">{body}</p>
					{image && (
						<div className="relative w-full h-[400px] bg-blue-500 mt-[14px]">
							<Image src={image} alt="bg" fill />
						</div>
					)}
					<div className="flex mt-3 text-white">
						<InteractButton setHover={setIsCommentHovered} isBlue count={commentCount?.toString()! || "0"} isHovered={isCommentHovered} icon={IoChatboxOutline} />
						<InteractButton setHover={setIsHeartHovered} count={likeCount?.toString()! || "0"} isHovered={isHeartHovered} icon={AiOutlineHeart} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Feed
