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
			<Feed post={feed} likedFeedId={likedFeed?.id} isLikedByUser={likedFeed?.userId === user.id} comments={feed.comments.reverse()} />
		</>	
	)
}

export default Page