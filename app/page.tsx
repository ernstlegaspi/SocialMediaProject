import getCurrentUser from '@/actions/getCurrentUser'
import getFeed from '@/actions/getFeed'
import AuthForm from '@/components/AuthForm'

import Feed from '@/components/Feed'

export default async function HomePage() {
	const user = await getCurrentUser()
	const posts = await getFeed()

	return (
		<>
			{user ? (
				<>
					<div className="border-b border-slate-700 h-[150px] p-5">
						<p className="text-white">Create Post Placeholder</p>
					</div>
					<div className="h-full w-full overflow-y-auto feed-scroll">
						{posts?.map(post => {
							return (
								<Feed key={post.id} time={post.createdAt} name={user?.firstName} tag={user.tag} body={post.body} likeCount={post?.likeCount} commentCount={post?.commentCount} post={post} />
							)
						})}
					</div>
				</>
			) : <AuthForm />}
		</>
	)
}
