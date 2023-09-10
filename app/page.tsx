import getFeeds from '@/actions/getFeeds'
import getCurrentUser from '@/actions/getCurrentUser'
import AuthForm from '@/components/AuthForm'

import Feed from '@/components/Feed'

export default async function HomePage() {
	const currentUser = await getCurrentUser()
	const feeds = await getFeeds()
	
	return (
		<>
			{currentUser ? (
				<>
					<div className="border-b border-slate-700 h-[150px] p-5">
						<p className="text-white">Create Post Placeholder</p>
					</div>
					<div className="h-full w-full overflow-y-auto feed-scroll">
						{feeds?.map(feed => {
							return (
								<>
									{
										<Feed key={feed.id} dateTime={feed.createdAt} name={feed.userName} tag={feed.userTag} body={feed.body} likeCount={feed?.likeCount} commentCount={feed?.commentCount} id={feed.id} />
									}
								</>
							)
						})}
					</div>
				</>
			) : <AuthForm />}
		</>
	)
}
