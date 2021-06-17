import {useEffect} from 'react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

function Login() {
  const router = useRouter()
  // console.log('next:', router.query.next)
  // console.log('jHHHH:', router)
  const [session, loading] = useSession()
  const nextRoute = router.asPath.split('next=')[1]
  const callbackUrl = nextRoute ? `${process.env.NEXT_PUBLIC_URL}${nextRoute}` : '/' 

  useEffect(() => {
    if (nextRoute && session) router.push(nextRoute, undefined, { shallow: true })
    if (!nextRoute && session) router.push('/', undefined, { shallow: true })
  }, [session])

  return (
    !session && !loading ? <div className="flex flex-col .justify-center items-center h-48 space-y-8 py-8">
      <p className="font-bold">Login</p>
      <button
        onClick={(e) => {
          e.preventDefault()
          signIn('github', { callbackUrl: `${process.env.NEXT_PUBLIC_URL}${router.asPath}` }) // fix this url
        }}
        className="px-4 py-1 text-white bg-alt-black dark:bg-white dark:text-alt-black rounded-2xl"
      >
        Login with GitHub
      </button>
    </div> : null
  )
}

export default Login

