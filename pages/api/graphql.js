import { GraphQLClient } from 'graphql-request'
import { checkRequest } from '../../lib'

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_URL
const client = new GraphQLClient(endpoint, {})

const handler = async (req, res) => {
  const { body, cookies } = req
  const { query, variables } = body

  const cookieName = process.env.SESSION_COOKIE_NAME
  const token = cookies[cookieName]
  const headers = {
    authorization: `Bearer ${token}`,
  }
  const { refresh } = cookies

  if (refresh) {
    headers['x-hasura-role'] = refresh
  }

  console.log(refresh, headers)

  try {
    const data = await client.setHeaders(headers).request(query, variables)

    return res.send(data)
  } catch (err) {
    return res.send(err.response.errors)
  }
}

export default checkRequest(handler)
