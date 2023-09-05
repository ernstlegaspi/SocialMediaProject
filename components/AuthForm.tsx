'use client'

import LoginModal from "./modals/LoginModal"
import RegisterModal from "./modals/RegisterModal"

const AuthForm = () => {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="bg-white rounded-md bg-box-shadow w-[60%] h-[80%] flex">
				<div className="w-1/2 h-full bg-[url('/img/papers.jpg')] rounded-l-md">
					<div className="h-full w-absolute z-10 transparent-black rounded-l-md flex items-center justify-center">
						<p className="z-20 text-white font-bold text-3xl w-3/4 text-center italic">Share Your Thoughts, Ignite Conversations</p>
					</div>
				</div>
				<div className="w-1/2 h-full">
					<div className="relative overflow-hidden h-full w-3/4 m-auto">
						<h1 className="italic font-bold text-5xl text-main-color text-center my-10">PozIt</h1>
						<LoginModal />
						<RegisterModal />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthForm