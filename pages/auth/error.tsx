import { useRouter } from "next/router"
import Link from "next/link"

export default function Error() {
  const router = useRouter()
  const { error } = router.query

  return (
    <div>
      <p>An error occurred: {error}</p>
      <Link href="/login">Go back to login</Link>
    </div>
  )
}
