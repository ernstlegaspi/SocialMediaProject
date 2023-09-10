import Feed from './Feed'
import getFeedById from '@/actions/getFeedById'

interface IParams {
	id: string
}

const Page = async ({ params }: { params: IParams }) => {
	const feed = await getFeedById(params)

	if(!feed) return null

	return (
		<>
			<Feed id={feed.id} userName={feed.userName} userTag={feed.userTag} body={feed.body} dateTime={feed.createdAt} comments={feed.comments.reverse()} />
		</>	
	)
}

export default Page