import getCurrentUser from '@/actions/getCurrentUser'
import getFeed from '@/actions/getFeed'
import AuthForm from '@/components/AuthForm'

import Sidebar from '@/components/Sidebar/Sidebar'
import Feed from '@/components/Feed'
import Trendsbar from '@/components/Trendsbar/Trendsbar'
import PostModal from '@/components/modals/PostModal'

export default async function HomePage() {
	const user = await getCurrentUser()
	const posts = await getFeed()
	
	
	return (
		<>
			{user ? (
				<div className="bg-main-color flex justify-center w-full h-full">
				<Sidebar />
				<div className="border-x border-slate-700 w-[30%] flex justify-between">
					<div className="w-full h-full flex flex-col">
						<div className="border-b border-slate-700 h-[150px] p-5">
							<p className="text-white">Create Post Placeholder</p>
						</div>
						<div className="h-full w-full overflow-y-auto feed-scroll">
							{posts?.map(post => {
								console.log(post.createdAt)

								return (
									<Feed key={post.id} time={post.createdAt} name={user?.firstName} tag={user.tag} body={post.body} likeCount={post?.likeCount} commentCount={post?.commentCount} />
								)
							})}
						</div>
					</div>
				</div>
				<Trendsbar />
				<PostModal />
			</div>
			) : (
				<AuthForm />
			)}
		</>
	)
}
