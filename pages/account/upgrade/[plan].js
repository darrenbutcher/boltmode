/* eslint-disable react-hooks/exhaustive-deps */
// import PropTypes from 'prop-types'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import prisma from '@/prisma'   
import { capitalize } from 'lodash'
import { Transition } from '@headlessui/react'
 import { formatMoney, withProtected } from '@/lib'
import useSWR, { trigger, mutate, cache } from 'swr'
import { useForm } from 'react-hook-form'
import { useHasuraGateway } from '../../../components/providers'
import { useSession } from 'next-auth/client'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'

const GET_FEED_QUERY = `
query getFeed {
  feed {
    content
    id
    title
  }
}
`

const getPriceId = (product_price) => {
  let x
  switch (product_price) {
    case 'premium':
      return x = 'price_1I4qbPA44Onh20hZ244ykonp'
      break
    case 'elite':
      return x = 'price_1I4qe1A44Onh20hZLPSeTLpi'
      break
  }
  return x
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
    },
  },
  hidePostalCode: true
}


// function Up({ stripeCustomer, plan }) { return <div>Yo ${plan.name}</div> }
function Upgrade({plan, stripeCustomer }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setProcessingTo] = useState(false)
  const [checkoutError, setCheckoutError] = useState()
  const [customerPaymentmethod, setCustomerPaymentmethod] = useState()
  const [customerCardExpiry, setCustomerCardExpiry] = useState()
  // const [cookies, setCookie, removeCookie] = useCookies()

  // const [session] = useSession()

  
  const { register, handleSubmit, watch, errors, formState, reset } = useForm()
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    console.log('is plan mounted')
  })

const fetcher = (url, paymentMethodId) => fetch(
  url,
  {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      paymentMethodId
    }),
  }
).then(r => r.json())

const { data } = useSWR(
  stripeCustomer ? '/api/payment/retrieve-customer-payment-method' : null,
  (q) => fetcher(q, stripeCustomer.paymentMethodId)
)

useEffect(()=>{
  if (data) {
    const paymentMethod =
      `${capitalize(data.card.brand)} •••• ${data.card.last4}`;
  
    const cardExpiry =
      `${data.card.exp_month}/${data.card.exp_year}`
    
    setCustomerPaymentmethod(paymentMethod);
    setCustomerCardExpiry(cardExpiry)
  } 
}, [data])

  const handleCardDetailsChange = e => {
    e.error ? setCheckoutError(e.error.message) : setCheckoutError()
  }
  
  const onSubscriptionComplete = () => {
    setProcessingTo(false)
    setIsOpen(false)
    toast('Payment Success 🎉', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'rounded-md bg-white',
      bodyClassName: "text-gray-600 pl-4",
    })
  }

  const onSubmit = formData => {
    const customerId = 'cus_IgrZTLwaUd9dgD'//createCustomer()
    const cardElement = elements.getElement("card")
    setProcessingTo(true);

    const billingDetails = {
      // name: session.user.name,
      // email: ev.target.email.value,
      address: {
        city: formData.city,
        line1: formData.address1,
        line2: formData.address2,
        state: formData.stateProv,
        postal_code: formData.postalCode
      }
    }

    createPaymentMethod(cardElement, customerId, billingDetails)
  }
 
  const createPaymentMethod = (card, customerId, billingDetails) => {
    // Set up payment method for recurring usage
    const priceId = getPriceId(Router.query.plan)
  
    stripe
      .createPaymentMethod({
        type: 'card',
        card: card,
        billing_details: billingDetails
      })
      .then((result) => {
        if (result.error) {
          // displayError(result);
          setCheckoutError(result.error.message)
          setProcessingTo(false);
        } else {
          createSubscription({
            customerId: customerId,
            paymentMethodId: result.paymentMethod.id,
            priceId: priceId,
          })
        }
      })
  }

  const createCustomer = () => {
    const billingEmail = session.user.email
    return fetch('/api/payment/create-customer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: billingEmail,
      }),
    })
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      // result.customer.id is used to map back to the customer object
      console.log(result)
      return result
    })
  }

  const createSubscription = ({ customerId, paymentMethodId, priceId }) => {
    return (
      fetch('/api/payment/create-subscription', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,
          paymentMethodId: paymentMethodId,
          priceId: priceId,
        }),
      })
        .then((response) => {
          return response.json()
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            // The card had an error when trying to attach it to a customer.
            // throw result;
            setCheckoutError(result.error.message)
            setProcessingTo(false)
          }
          return result
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then((result) => {
          return {
            paymentMethodId: paymentMethodId,
            priceId: priceId,
            subscription: result,
          };
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        //.then(handlePaymentThatRequiresCustomerAction)
        // If attaching this card to a Customer object succeeds,
        // but attempts to charge the customer fail, you
        // get a requires_payment_method error.
        //.then(handleRequiresPaymentMethod)
        // No more actions required. Provision your service for the user.
        .then(onSubscriptionComplete)
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          // showCardError(error);
          setCheckoutError(result.error.message)
        })
    )
  }

//   <>
//   <div className="h-4 mt-2 bg-gray-200 w-52 animate-pulse" />
//   <div className="w-24 py-4 ml-4 bg-gray-200 rounded-full animate-pulse" />
// </>

  return (
    <>{(
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" w-full max-w-4xl p-6 mx-auto .bg-red-100">
          <h3 className="text-2xl font-bold">
            {`Subscribe to ${capitalize(plan.name)} Plan`}
          </h3>
          <p className="mt-12 text-xs uppercase">Upgrading to</p>
          <div className="flex space-x-2">
            <div className="w-2/5">
              <div className="pr-6 py-6 flex justify-between .w-2/5 flex-shrink-0 items-baseline">
                <p className="font-bold">{capitalize(plan.name)}</p>
                <p>
                  <span className="text-2xl font-bold">
                    {plan && formatMoney(plan.price)}
                  </span>{' '}
                  / mo
                </p>
              </div>
              <div className="div">
                <p>
                  Some simple explaination of the {capitalize(plan.name)} plan.
                  {customerPaymentmethod}
                </p>
              </div>
            </div>
            <div className="px-6 py-6 rounded shadow-md .text-sm w-3/5 flex-shrink-0">
              <div className="w-full px-3 mb-6 md:w-full">
                <h3 className="text-lg">Billing information</h3>
              </div>
              {/* */}
              {isOpen && <div className="w-full px-3 mb-6 md:w-full flex justify-end">
                <a className="inline-block .mt-12 text-blue-600 hover:underline text-sm cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                  Cancel
                </a>
              </div>}
              <Transition
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              > 
                <div className="w-full px-3 mb-6 md:w-full">
                  <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                    Address 1
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    required
                    ref={register}
                    name="address1"
                  />
                </div>
                <div className="w-full px-3 mb-6 md:w-full">
                  <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                    Address 2
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    ref={register}
                    name="address2"
                  />
                </div>
                <div className="w-full px-3 mb-6 md:w-full">
                  <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                    Country
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    required
                    ref={register}
                    name="country"
                  />
                </div>
                <div className="w-full px-3 mb-6 md:w-full">
                  <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                    City
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    required
                    ref={register}
                    name="city"
                  />
                </div>
                <div className="w-full px-3 mb-6 md:w-full">
                  <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                    State/Province
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    ref={register}
                    name="stateProv"
                  />
                </div>
                <div className="w-full px-3 mb-6 md:w-full">
                  <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                    Postal Code
                  </label>
                  <input
                    className="appearance-none block w-full max-w-xs bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    required
                    ref={register}
                    name="postalCode"
                  />
                </div>
                <div className="w-full px-3 mb-6 md:w-full">
                  <CardElement 
                    options={cardElementOptions}
                    onChange={handleCardDetailsChange} 
                  />
                </div>
                {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
              </Transition>
              <div className="w-full px-3 .mb-6 md:w-full">
                <div className="flex justify-between">
                  <div className="flex justify-between .bg-red-300 w-full items-end">
                    {(customerPaymentmethod && !isOpen) && 
                    <div className="flex items-center mt-8 space-x-2 text-gray-500">
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      
                      <p className="font-bold">{customerPaymentmethod}</p>
                      <p>expires {customerCardExpiry}</p>
                    </div>}
                    {!isOpen && <a className="inline-block .mt-12 text-blue-600 hover:underline text-sm cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                      Change
                    </a>}
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="mt-4 block .text-gray-500 bg-blue-600 text-white rounded-full px-6 py-2 text-center font-bold disabled:bg-gray-200" disabled={isProcessing || !stripe}
                >
                  {isProcessing ? 
                  <span className="flex space-between items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </span> : 'Upgrade'}
                </button>
              </div>
              
            {/* */}
            </div>
          </div>
          <Link href="/account">
            <a className="inline-block mt-12 text-blue-600 hover:underline">
              Back to account settings
            </a>
          </Link>
          <a className="inline-block mt-12 text-blue-600 hover:underline" 
            onClick={() => {
              // setCookie('refresh', 'elite')
              // trigger(GET_FEED_QUERY)
              // mutate()
              // console.log(cache)
            }}
          >
            Refresh
          </a>
          <a className="inline-block mt-12 text-blue-600 hover:underline" 
            onClick={() => {
              // removeCookie('refresh')
              // trigger(GET_FEED_QUERY)
              // mutate()
              // console.log(cache)
            }}
          >
            Delete Refresh
          </a>
        </div>
      </form>
    )}</>
  )
}


Upgrade.isProtected = withProtected
export default Upgrade

export async function getStaticPaths() {
  return {
    paths: [{ params: { plan: 'premium' } }, { params: { plan: 'elite' } }],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const plan = await prisma.plan.findUnique({
    where: {
      name: capitalize(params.plan),
    },
    select: {
      name: true,
      price: true,
    },
  })

  return { props: { plan } }
}

const CheckoutError = ({children}) => {
  return(
    <>

    </>
  )
}