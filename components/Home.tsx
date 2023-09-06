'use client'

import Sidebar from './Sidebar/Sidebar'
import Feed from './Feed'

const Home = () => {
	return (
		<div className="bg-main-color flex w-full h-full">
			<Sidebar />
			<div className="h-full w-[0.1px] bg-slate-700"></div>
			<Feed />
		</div>
	)
}

export default Home