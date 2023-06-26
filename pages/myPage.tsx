import { NextPage } from "next"
import { signOut, useSession } from "next-auth/react"

interface Props {}

const MyPage: NextPage<Props> = ({}) => {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/signin" })
    // Redirect to the login page
    // Example: router.push('/login')
    console.log("Logged out")
  }

  if (!session) {
    // If the user is not logged in, redirect to the login page
    return <div>You are not logged in</div>
  }

  return (
    <div>
      <h1>Welcome {session.user?.email}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default MyPage
