import PropTypes from 'prop-types'
import { GraphQLClient } from 'graphql-request'
import { createContext, useContext, useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'
import { usePreEffect, isClient } from '../../lib'

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT

export const GraphAPIContext = createContext()
export const AuthContext = createContext()

const defaultClient = new GraphQLClient(endpoint, {})

export default function GraphProvider({ children }) {
  const [token, setToken] = useState()
  const [client, setClient] = useState(defaultClient)

  // useEffect(() => {
  //   ;(async () => {
  //     const session = await getSession()
  //     const hasAuthorization = !!client.options?.headers?.authorization

  //     if (token === undefined) {
  //       setToken(session?.token)

  //       if (isClient && session) {
  //         localStorage.setItem(
  //           process.env.NEXT_PUBLIC_LOCALSTORAGE_LOGIN_KEY,
  //           true
  //         )
  //       }
  //     }

  //     if (token && !hasAuthorization) {
  //       const _client = new GraphQLClient(endpoint, {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         }
  //       })
  //       setClient(_client)
  //     }
  //   })()
  // }, [token])

  useEffect(() => {
    ;(async () => {
      const session = await getSession()
      const hasAuthorization = !!client.options?.headers?.authorization

      if (token === undefined) {
        setToken(session?.token)

        if (isClient && session) {
          localStorage.setItem(
            process.env.NEXT_PUBLIC_LOCALSTORAGE_LOGIN_KEY,
            true
          )
        }
      }

      if (token && !hasAuthorization) {
        const _client = new GraphQLClient(endpoint, {
          headers: {
            authorization: `Bearer ${token}`,
          }
        })
        setClient(_client)
      }
    })()
  }, [token])

  return (
    <GraphAPIContext.Provider value={client}>
      {/* <AuthContext.Provider value={token}>{children}</AuthContext.Provider> */}
      {children}
    </GraphAPIContext.Provider>
  )
}

GraphProvider.propTypes = {
  children: PropTypes.any,
}

export const useHasuraGateway = () => {
  const client = useContext(GraphAPIContext)
  const gatewayFetch = (query) => client.request(query)
  const hasAuthorization = !!client?.options?.headers?.authorization

  return { client, gatewayFetch, hasAuthorization }
}

export const useAuth = () => {
  const token = null //useContext(AuthContext)
  const [isAuthenticated, setIsAuthenticated] = useState()

  usePreEffect(() => {
    const _isAuthenticated = isClient
      ? !!localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_LOGIN_KEY)
      : null
    setIsAuthenticated(_isAuthenticated)
  })

  useEffect(() => {
    const _isAuthenticated = isClient
      ? !!localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_LOGIN_KEY)
      : null
    if (!isAuthenticated) setIsAuthenticated(_isAuthenticated)
  })

  return { token, isAuthenticated }
}
