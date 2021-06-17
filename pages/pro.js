import PropTypes from 'prop-types'
import useSWR, { cache } from 'swr'
import { useSession } from 'next-auth/client'
import { getLayout } from '@/layouts/main-layout'
import { withProtected } from '@/lib'
import {
  useAuth,
  useHasuraGateway,
} from '@/providers/graph-provider'
import { fetchGatewayAPI } from '@/lib'
import { GET_FEED_QUERY } from '@/graphql/queries'


const PageLoader = () => (
  <div className="animate-pulse space-y-4 w-2/4">
    <div className="bg-gray-200 dark:bg-gray-800 w-full rounded-md h-52"></div>
    <div className="bg-gray-200 dark:bg-gray-800 w-full rounded-md h-52"></div>
  </div>
)

function ProPage() {
  const { hasAuthorization } = useHasuraGateway()
  const { isAuthenticated } = useAuth()

  const { data: posts } = useSWR(
    GET_FEED_QUERY,
    (query) => fetchGatewayAPI({ query }),
    { refreshInterval: 1000 }
  )

  const isLoadingPosts = !posts

  return (
    <>
      <div className="mt-8 flex flex-col items-center">
        {isLoadingPosts ? 
          <PageLoader /> :
            posts?.feed.map((post) => (
              <div className="bg-white dark:bg-gray-800 border-l-2 .border-blue-300 dark:border-gray-900 shadow w-2/4 h-2/3 rounded-md mb-6 px-4 py-6 animate-none">
                <h2
                  className="px-4 text-gray-600 font-bold text-lg"
                  key={post.id}
                >
                  {post.title}
                </h2>
                <p className="mt-2 px-4 text-gray-500 leading-7">
                  {post.content}
                </p>
              </div>
            )
          )
        }
      </div>
    </>
  )
}

ProPage.getLayout = getLayout
ProPage.isProtected = withProtected

// ProPage.settings = {
//   layout: getLayout,
//   isProtected: withProtected
//   title: 'This is the page title'
// }

export default ProPage
