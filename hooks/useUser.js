import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { getSession } from 'next-auth/client'
import { fetchGatewayAPI } from '@/lib'
import { GET_USER_ACCOUNT_ALT_QUERY } from '@/graphql/queries'

const useUser = () => {
  const [userInfo, setUserInfo] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState()

  const { data: user } = useSWR(
    isAuthenticated ? GET_USER_ACCOUNT_ALT_QUERY : null,
    (query) => fetchGatewayAPI({ query })
  )

  useEffect(() => {
    ;(async () => {
      const session = await getSession()
      if (session && !isAuthenticated) {
        setIsAuthenticated(true)
      }
    })()

    if (user?.info) {
      setUserInfo(user.info[0])
    }
  }, [isAuthenticated, user])

  return [userInfo]
}

export default useUser
