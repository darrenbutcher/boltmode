import { GraphQLClient } from 'graphql-request'

const API_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_API_URL

export function apiFetcher() {
  const gqlClient = new GraphQLClient(API_ENDPOINT, {})

  const client = (token) =>
    gqlClient.setHeader('Authorization', `Bearer ${token}`)

  const gateway = (token, query) => client(token).request(query)
  return { client, gateway }
}

export function gateway(token, query) {
  const client = new GraphQLClient(API_ENDPOINT, {})
  client.setHeader('Authorization', `Bearer ${token}`).request(query)
  return client
}
