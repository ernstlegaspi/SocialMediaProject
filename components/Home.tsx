'use client'

import Sidebar from './Sidebar/Sidebar'
import Feed from './Feed'
import Trendsbar from './Trendsbar/Trendsbar'

const Home = () => {
	return (
		<div className="bg-main-color flex justify-center w-full h-full">
			<Sidebar />
			<div className="border-x border-slate-700 w-[30%] flex justify-between">
				<div className="w-full h-full flex flex-col">
					<div className="border-b border-slate-700 h-[150px] p-5">
						<p className="text-white">Create Post Placeholder</p>
					</div>
					<div className="h-full w-full overflow-y-auto feed-scroll">
						<Feed />
						<Feed />
						<Feed />
						<Feed />
					</div>
				</div>
			</div>
				<Trendsbar />
		</div>
	)
}

export default Home