import getCurrentUser from '@/actions/getCurrentUser'
import AuthForm from '@/components/AuthForm'
import Home from '@/components/Home'

export default async function HomePage() {
	const currentUser = await getCurrentUser()
	
	return (
		<>
			{currentUser ? (
				<Home />
			) : (
				<AuthForm />
			)}
		</>
	)
}
