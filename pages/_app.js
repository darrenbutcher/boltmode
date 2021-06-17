/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
// import '../.storybook/ui-devtools/switcher.css'
import { Devtools } from '@ui-devtools/tailwind'
import PropTypes from 'prop-types'
import { Provider, getSession } from 'next-auth/client'
import MainLayout from '@/layouts/main-layout'
import { GraphProvider, useAuth, useHasuraGateway } from '@/providers'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/tailwind.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import useUser from '@/hooks/useUser'
import useStripeCustomer from '@/hooks/useStripeCustomer'
import { Head } from '@/atoms'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY)

// if (typeof window !== 'undefined') {
//   window.UI_DEVTOOLS_API = process.env.NEXT_PUBLIC_UI_DEVTOOLS_API
// }

function MyApp({ Component, pageProps }) {
  const [user] = useUser()
  const [stripeCustomer] = useStripeCustomer(user)

  const getLayout =
    Component.getLayout || ((page) => <MainLayout children={page} />)
  const mergeProtectedRoutes = Component.isProtected || ((page) => page)

  return (
    <>
      <Head title={Component.title} />
      <ThemeProvider attribute="class">
        <Provider session={pageProps.session}>
          <GraphProvider>
            <Elements stripe={stripePromise}>
              {getLayout(
                mergeProtectedRoutes(
                  <Component
                    {...pageProps}
                    stripeCustomer={stripeCustomer}
                    user={user}
                  />
                )
              )}
              <ToastContainer />
            </Elements>
          </GraphProvider>
        </Provider>
      </ThemeProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.shape({
    session: PropTypes.any,
  }),
}

export default MyApp
