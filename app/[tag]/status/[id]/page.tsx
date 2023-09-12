import Feed from './Feed'
import getFeedById from '@/actions/getFeedByIdWithComments'
import getLikedFeedByFeedId from '@/actions/getLikedFeedByFeedId'
import getCurrentUser from '@/actions/getCurrentUser'

interface IParams {
	id: string
}

const Page = async ({ params }: { params: IParams }) => {
	const feed = await getFeedById(params)
	const user = await getCurrentUser()

	if(!feed || !user) return null

	const likedFeed = await getLikedFeedByFeedId(feed.id)

	return (
		<>
			<Feed id={feed.id} likedFeedId={likedFeed?.id} isLikedByUser={likedFeed?.userId === user.id} userName={feed.userName} userTag={feed.userTag} body={feed.body} dateTime={feed.createdAt} comments={feed.comments.reverse()} />
		</>	
	)
}

export default Page