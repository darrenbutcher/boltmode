import useSWR from 'swr'

const useStripeCustomer = (user) => {
  const customerFetcher = (url, customerId) =>
    fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
      }),
    }).then((r) => r.json())

  const { data: stripeCustomer } = useSWR(
    user ? '/api/payment/customer' : null,
    (url) => customerFetcher(url, user.customer_id)
  )

  return [stripeCustomer]
}

export default useStripeCustomer
