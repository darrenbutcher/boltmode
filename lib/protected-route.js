import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../components/providers'
const Login = dynamic(() => import('../pages/login'))

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated === true) return
  
    const handleRouteChange = (url) => {
      if (isAuthenticated === false 
        && url === router.pathname
      ) {
          throw '4024' // Route cancellation hack. See GH issues. 
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    isAuthenticated == false && router.replace(router.pathname, `/login?next=${router.asPath}`, { shallow: true }) 

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [isAuthenticated])

  return (
    <>
      {(isAuthenticated === false) && <Login/>}
      {(isAuthenticated === true) && children}
    </>
  )
}

export const withProtected = (page) => <ProtectedRoute>{page}</ProtectedRoute>
export default ProtectedRoute



  // if (isAuthenticated === false) {
  //   return <Login next={router.pathname} />
  // }

  // if (isAuthenticated === true) {
  //   return <>{children}</>
  // }