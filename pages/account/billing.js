// import { withProtected } from '../../lib'
// import ProtectedRoute from '../../lib/protected-route'
// import { useAuth } from '../../components/providers'
// import { useSession } from 'next-auth/client'


// function Billing() {
//   const { isAuthenticated } = useAuth()
//   const [session] = useSession()
//   console.log('in billing', isAuthenticated, session)
//   return (
//     <ProtectedRoute sess={session}>
//       <div>
//         Billing Page
//       </div>
//     </ProtectedRoute>
//   )
// }

// //Billing.isProtected = withProtected

// export default Billing

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../components/providers'
import { useSession } from 'next-auth/client'
const Login = dynamic(() => import('../login'))

function Billing({ children, sess }) {
  const [session, loading] = useSession()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [b, setB] = useState(false)
  console.log('protected function')
  // usePreEffect(() => console.log('in pre efefct', isAuthenticated, session, sess))
  useEffect(() => {
    console.log('useEffect protected sess', sess)
    console.log('loading', loading)
    if (isAuthenticated === true) {
      // router.replace('/login', `${router.pathname}`, { shallow: true })
      console.log('omg session is true')
      return
    }

    const handleRouteChange = (url) => {
      console.log('here', isAuthenticated, session)
      if (isAuthenticated === false 
        && url === router.pathname
      ) {
          throw '4024' // Route cancellation hack. See GH issues. 
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    console.log(isAuthenticated, session)
    //setTimeout(() => {
    isAuthenticated == false && router.replace(router.pathname, `/login?next=${router.pathname}`, { shallow: true }) 
    //}, 2000)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      console.log('umounting ...', sess, session, isAuthenticated)
    }
  }, [session, isAuthenticated])

  // useEffect(() => {
  //   setLog(true)
  // }, [log])

  // if (!session) {
  //  return <Login next={router.pathname} />
  // }

  // if (session === true) {
  //   return <div>Billing Page</div>
  // }

  // return null

  return (
    <>
      {/* {(isAuthenticated === false) ? <Login next={router.pathname} /> : <><div>Billing Page</div></>} */}
      {/* {(session || isAuthenticated === true) && children} */}
      {(isAuthenticated === false) && <Login next={router.pathname} />}
      {(isAuthenticated === true) && <div>Billing Page</div>}
    </>
  )
}

export default Billing