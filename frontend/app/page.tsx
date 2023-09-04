import HomePage from '@/components/Home'

import getSession from '@/actions/getSession'

export default async function Home() {
	const session = await getSession()
	
	console.log(session?.user?.email)
	
	return (
		<>
			<HomePage />

			{session?.user?.email && (
				<p className="font-bold text-2xl">Logged In</p>
			)}
		</>
	)
}
