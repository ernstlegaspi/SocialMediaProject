'use client'

import { signOut } from 'next-auth/react'

const Home = () => {
	return (
		<button onClick={() => signOut()}>Logout</button>
	)
}

export default Home