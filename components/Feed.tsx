'use client'

import Link from 'next/link'
import Avatar from './Avatar'

import { AiOutlineHeart } from 'react-icons/ai'
import { IoChatboxOutline } from 'react-icons/io5'
import { IconType } from 'react-icons'
import { useState } from 'react'

import Image from 'next/image'

interface FeedProps {
	avatar?: string
	body?: string
	commentCount?: number
	image?: string
	likeCount?: number
	name?: string
	tag?: string
	time?: string
}

const Feed = ({ avatar, body, commentCount, image, likeCount, name, tag, time }: FeedProps) => {
	const [isCommentHovered, setIsCommentHovered] = useState(false)
	const [isHeartHovered, setIsHeartHovered] = useState(false)
	
	const interactButton = (setHover: any, isBlue: boolean, isHovered: boolean, Icon: IconType, count: string) => {
		return (
			<div onMouseEnter={() => setHover((val: boolean) => !val)} onMouseLeave={() => setHover((val: boolean) => !val)} className="text-gray-500 flex items-center mr-10">
				<div className={`${isHovered ? `${isBlue ? 'bg-sky-300/10' : 'bg-red-400/20'}` : ''} py-[5px] px-[6px] rounded-full`}>
					<Icon color={`${isHovered ? `${isBlue ? 'lightblue' : 'red'}` : ''}`} size={20} />
				</div>
				<span className={`${isHovered ? `${isBlue ? 'blue' : 'red'}` : ''} ml-2`}>{count}</span>
			</div>
		)
	}

	return (
		<div className="hover:bg-slate-500/5 cursor-pointer p-5 border-b border-slate-700 w-full">
			<div className="flex">
				<Link href="/">
					<Avatar src={avatar} />
				</Link>
				<div className="flex flex-col ml-5">
					<div className="flex items-center">
						<p className="hover:underline font-bold text-white">{name}</p>
						<p className="text-sm mx-1 text-gray-500">· @{tag} ·</p>
						<p className="text-sm text-gray-500">{time}</p>
					</div>
					<p className="mt-1 text-white/80 text-sm">{body}</p>
					{image && (
						<div className="relative w-full h-[400px] bg-blue-500 mt-[14px]">
							<Image src={image} alt="bg" fill />
						</div>
					)}
					<div className="flex mt-3 text-white">
						{interactButton(setIsCommentHovered, true, isCommentHovered, IoChatboxOutline, commentCount?.toString()!)}
						{interactButton(setIsHeartHovered, false, isHeartHovered, AiOutlineHeart, likeCount?.toString()!)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Feed
