// import PropTypes from 'prop-types'
import { getLayout } from '@/layouts'
import {
  withProtected,
  fetchGatewayAPI,
  formatMoney,
  settingsToastOptions,
} from '@/lib'
import useSWR, { trigger, mutate } from 'swr'
import { useHasuraGateway } from '@/providers'
import prisma from '@/prisma'
import { useForm } from 'react-hook-form'
import { isEmpty, orderBy, capitalize } from 'lodash'
import { toast } from 'react-toastify'
import ReactModal from 'react-modal'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import {
  GET_USER_ACCOUNT_ALT_QUERY,
  GET_USER_ACCOUNT_QUERY,
} from '@/graphql/queries'
import { UPDATE_PROFILE_MUTATION } from '@/graphql/mutations'

const MyModal = ({ closeModal }) => (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      {/*
Background overlay, show/hide based on modal state.

Entering: "ease-out duration-300"
  From: "opacity-0"
  To: "opacity-100"
Leaving: "ease-in duration-200"
  From: "opacity-100"
  To: "opacity-0"
    */}
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-white opacity-75" />
      </div>
      {/* This element is to trick the browser into centering the modal contents. */}
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        ​
      </span>
      {/*
Modal panel, show/hide based on modal state.

Entering: "ease-out duration-300"
  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  To: "opacity-100 translate-y-0 sm:scale-100"
Leaving: "ease-in duration-200"
  From: "opacity-100 translate-y-0 sm:scale-100"
  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    */}
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              {/* Heroicon name: exclamation */}
              <svg
                className="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Deactivate account
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to deactivate your account? All of your
                  data will be permanently removed. This action cannot be
                  undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Deactivate
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)

const PageLoader = () => (
  <div className="animate-pulse flex space-x-4 mt-6">
    <div className="flex-1 space-y-4 py-1">
      <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
      </div>
      <div className="space-y-8">
        <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
        <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded w-5/6" />
      </div>
    </div>
  </div>
)

function Account({ stripeCustomer, plans }) {
  const { hasAuthorization } = useHasuraGateway()
  const { register, handleSubmit, watch, errors, formState, reset } = useForm()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [isSavingSettings, setSavingSettings] = useState(false)

  const afterOpenModal = () => {
    const scrollBarWidth = document.body.offsetWidth - document.body.clientWidth
    console.log(scrollBarWidth)
    document.body.style.marginRight = '17px' // `${scrollBarWidth}px`
    // const el = document.querySelector(".bix")
    // el.style.marginLeft = '5px'
    document.body.classList.add('overflow-y-hidden')
  }

  const afterCloseModal = () => {
    document.body.style.marginRight = '0px'
    // const el = document.querySelector(".bix")
    // el.style.marginLeft = '-5px'
    document.body.classList.remove('overflow-y-hidden')
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  // const transition = (path) => {
  //   const pathName = `/account/upgrade/${path}`
  //   Router.push({ pathname: pathName, query: { currentPlan: profile.plan.name } }, pathName)
  // }

  const onSubmit = async (formData) => {
    // if(isEmpty(formState.dirtyFields) === true) return
    setSavingSettings(true)
    const {
      notify_comment_mentions_web,
      send_email_digest,
      ...users_set_input
    } = formData

    //  const {
    //   notify_comment_mentions_web,
    //   send_email_digest,
    //   ...users_set_input
    //  } = formState.dirtyFields
    // mutate(GET_USER_ACCOUNT_QUERY, {...data, profile: { plan: data.profile.plan, ...users_set_input}}, false)
    mutate(
      GET_USER_ACCOUNT_QUERY,
      { ...user, info: [{ ...userInfo, ...users_set_input }] },
      false
    )

    const mutation = {
      query: UPDATE_PROFILE_MUTATION,
      variables: {
        changes: users_set_input,
        email_digest_setting: send_email_digest,
        comment_mentions_web_setting: notify_comment_mentions_web,
      },
    }

    await fetchGatewayAPI(mutation)
      .then(() => {
        trigger(mutation)
        setSavingSettings(false)
        trigger(GET_USER_ACCOUNT_ALT_QUERY)
        trigger(GET_USER_ACCOUNT_QUERY)
        reset(formData)
        toast('Settings saved.', settingsToastOptions)
      })
      .catch((e) => {
        reset(formData)
        toast('Could not save settings. Try again later.', settingsToastOptions)
      })
  }

  const fetcher = (url, customerId) =>
    fetch(url, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
      }),
    }).then((r) => r.json())

  const { data: user } = useSWR(
    hasAuthorization ? GET_USER_ACCOUNT_QUERY : null,
    (query) => fetchGatewayAPI({ query })
  )

  useEffect(() => {
    if (user?.info) {
      setUserInfo(user.info[0])
    }
  }, [user])

  const { data: charges } = useSWR(
    ['/api/payment/charges', stripeCustomer?.id],
    (url) => fetcher(url, stripeCustomer.id)
  )

  const isLoadingCharges = !charges

  const isLoadingProfile = !user
  const profile = userInfo || {}
  // const { profile } = data ? data : { profile: null }
  // const { plans } = data ? data : { plans: null }

  return (
    <>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onAfterClose={afterCloseModal}
        onRequestClose={closeModal}
        className=".z-1"
      >
        <MyModal closeModal={closeModal} />
      </ReactModal>
      <PageWrapper isLoading={isLoadingProfile}>
        <SectionTitle title={`Account ${stripeCustomer?.id}`} />
        <AccountForm
          register={register}
          profile={profile}
          formState={formState}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          isSavingSettings={isSavingSettings}
        />
        <SectionTitle title="Plan" />
        <PlanInfo profile={profile} plans={plans} transition={false} />
        <PlanExtra setIsOpen={setIsOpen} stripeCustomer={stripeCustomer} />
        <SectionTitle title="Billing History" />
        <BillingTable isLoading={isLoadingCharges}>
          {charges &&
            charges.map((charge) => (
              <BillingItem key={charge.id} charge={charge} />
            ))}
        </BillingTable>
      </PageWrapper>
    </>
  )
}

Account.getLayout = getLayout
Account.isProtected = withProtected

export async function getStaticProps() {
  const plans = await prisma.plan.findMany({
    select: {
      name: true,
      price: true,
    },
  })

  return { props: { plans } }
}

export default Account

const PageWrapper = ({ children, isLoading }) => (
  <div className="container mx-auto">
    <div className="inputs w-full max-w-3xl p-6 mx-auto">
      {isLoading ? <PageLoader /> : children}
    </div>
  </div>
)

// <div className="space-y-2">
//   <p className="text-center font-bold text-gray-400">$12.00 / mo</p>
//   <Link href="/account/upgrade/elite">
//     <a className="block border border-purple-200 text-gray-500 rounded-full px-6 py-2 text-center font-bold">Upgrade to Elite</a>
//   </Link>
// </div>

//   <div className="flex space-x-4">
//   {plans && orderBy(plans, 'price', 'asc').map(plan => {
//     if (plan.name !== profile.plan.name)
//       return (
//         <div className="space-y-2" key={plan.id}>
//           <p className="text-center font-bold text-gray-400">{plan.name === 'Standard' ? 'Free forever' : `${formatMoney(plan.price)} / mo`} </p>
//       {plan.name !== 'Standard' ? <Link  href={{pathname: `/account/upgrade/${plan.name.toLowerCase()}`}}>
//           <a onClick={() => transition(plan.name.toLowerCase())}className="block border border-purple-200 text-gray-500 rounded-full px-6 py-2 text-center font-bold">{profile.plan.price < plan.price ? `Upgrade to` : `Change to` } {plan.name}</a>
//     </Link> : <span className="block border border-purple-200 text-gray-500 rounded-full px-6 py-2 text-center font-bold">{plan.name}</span>}
//     </div>
//     )
//  })
//  }
// </div>
/// /////////////////////////////////////////////
//   <div className="flex justify-between bg-gray-50 pl-6 py-2 rounded items-center">
//   <div className="flex space-x-2 text-gray-600 items-center">
//     <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//     </svg>
//     <p className="">
//       <span className="font-bold">Visa</span> ending **** **** **** 4102
//     </p>
//   </div>
//   <button
//     className="appearance-none bg-blue-600 text-white px-4 py-1 shadow-sm rounded-full mr-3 uppercase text-sm"
//     type="submit"
//   >
//     change card details
//   </button>
// </div>

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl text-gray-900 mt-8">{title}</h2>
)

const PlanInfo = ({ profile, plans }) => {
  const router = useRouter()

  const transition = (e, path) => {
    e.preventDefault()
    console.log(path)
    const pathName = `/account/upgrade/${path}`
    router.push(pathName)
    // Router.push(pathName)
    // Router.push({ pathname: pathName, query: { currentPlan: profile.plan.name } }, pathName)
  }

  if (!plans) return null

  return (
    <div className="flex justify-bewteen space-x-4">
      <div className="space-y-2  px-8 .bg-gray-50 shadow-md rounded my-6 text-sm text-gray-600 mt-6 py-8 w-2/4">
        <p className="text-md font-bold uppercase text-center">Current plan</p>
        <p className="text-2xl uppercase font-bold text-center text-gray-500">
          {profile.plan?.name === 'Standard'
            ? 'Free'
            : formatMoney(profile.plan?.price)}
        </p>
        <p className="mx-auto bg-purple-50 text-purple-500 rounded-full px-6 py-2 w-32 text-center font-bold">
          {profile.plan?.name}
        </p>
      </div>
      <div className="space-y-4  px-8 bg-white shadow-md rounded my-6 text-sm text-gray-600 mt-6 py-8 w-full">
        <p className="text-md font-bold uppercase">Other plans</p>
        <div className="flex space-x-4">
          {plans &&
            profile &&
            orderBy(plans, 'price', 'asc').map((plan) => {
              if (plan?.name !== profile.plan?.name)
                return (
                  <div className="space-y-2" key={plan.id}>
                    <p className="text-center font-bold text-gray-400">
                      {plan.name === 'Standard'
                        ? 'Free forever'
                        : `${formatMoney(plan?.price)} / mo`}{' '}
                    </p>
                    {plan.name !== 'Standard' ? (
                      <button
                        type="submit"
                        onClick={(e) => transition(e, plan.name.toLowerCase())}
                        className="block border border-purple-200 text-gray-500 rounded-full px-6 py-2 text-center font-bold"
                      >
                        {profile.plan?.price < plan.price
                          ? `Upgrade to`
                          : `Change to`}{' '}
                        {plan.name}
                      </button>
                    ) : (
                      <span className="block border border-purple-200 text-gray-500 rounded-full px-6 py-2 text-center font-bold">
                        {plan.name}
                      </span>
                    )}
                  </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

// Router.push('/account/upgrade/premium')

// plan.name.toLowerCase()
// transition('premium')

const PlanExtra = ({ stripeCustomer, setIsOpen }) => (
  <div className="flex justify-between items-center">
    <p className="text-sm text-gray-600">
      Your next charge will process on{' '}
      {dayjs.unix(stripeCustomer?.currentPeriodEnd).format('MMMM D, YYYY')} for
      another month of service.
    </p>
    <button
      className="appearance-none border border-gray-200 text-gray-500 px-4 py-1 shadow-sm rounded-full mr-3 uppercase text-sm"
      type="submit"
      onClick={() => setIsOpen(true)}
    >
      Cancel plan
    </button>
  </div>
)

const BillingItem = ({ charge }) => (
  <tr className="hover:bg-grey-lighter">
    <td className="py-4 px-6 border-b border-grey-light">
      <BillingStatus isPaid={charge?.paid} />
    </td>
    <td className="py-4 px-6 border-b border-grey-light">{charge?.id}</td>
    <td className="py-4 px-6 border-b border-grey-light text-xs">
      {dayjs.unix(charge?.date).format('MMM D YYYY')}
    </td>
    <td className="py-4 px-6 border-b border-grey-light">{`${capitalize(
      charge?.card.brand
    )} ending in ${charge?.card.last4}`}</td>
    <td className="py-4 px-6 border-b border-grey-light">
      {formatMoney(charge?.amount)}
    </td>
    <td className="py-4 px-6 border-b border-grey-light flex justify-center">
      <ReceiptLink link={charge?.receiptURL} />
    </td>
  </tr>
)

const BillingLoader = () => (
  <tr className=".flex .justify-center animate-pulse .p-4 bg-gray-50 .w-full">
    <td colSpan="6" className="font-bold .bg-red-100 py-4 px-6 space-x-4">
      <svg
        className="animate-spin .-ml-1 .mr-3 h-5 w-5 text-blue-500 text-center mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {/* <p className="text-center">Loading...</p> */}
    </td>
  </tr>
)

const NoBillingInfo = () => (
  <tr className=".flex .justify-center .p-4 bg-gray-50 .w-full">
    <td colSpan="6" className="font-bold .bg-red-100 py-4 px-6 space-x-4">
      <p className="text-center">You do not have any billing info.</p>
    </td>
  </tr>
)

const BillingStatus = ({ isPaid }) =>
  isPaid ? (
    <svg
      className="w-5 h-5 text-green-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      className="w-5 h-5 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )

const ReceiptLink = ({ link }) => {
  if (!link) return

  return (
    <a href={link} target="_blank">
      <svg
        className="w-5 h-5 text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  )
}

const BillingTable = ({ children, isLoading }) => (
  <div className="w-full mx-auto mt-4">
    <div className="bg-white shadow-md rounded my-6 text-sm text-gray-600">
      <table className="text-left w-full border-collapse">
        {' '}
        {/* Border collapse doesn't work on this site yet but it's available in newer tailwind versions */}
        <thead>
          <tr>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light" />
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              ID
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Date
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Method
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Amount
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Receipt
            </th>
          </tr>
        </thead>
        <tbody>{isLoading ? <BillingLoader /> : children}</tbody>
      </table>
    </div>
  </div>
)

const AccountForm = ({
  register,
  profile,
  formState,
  onSubmit,
  handleSubmit,
  isSavingSettings,
}) => (
  <form
    className="mt-6 .border-t .border-gray-400 pt-4"
    onSubmit={handleSubmit(onSubmit)}
  >
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-full px-3 mb-6">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-text-1"
        >
          email address
        </label>
        <input
          className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
          id="grid-text-1"
          type="text"
          placeholder="Enter email"
          defaultValue={profile.email}
          required
        />
      </div>
      <div className="personal w-full .border-t .border-gray-400 pt-4">
        <h2 className="text-2xl text-gray-900 px-3">Personal info</h2>
        <div className="flex items-center justify-between mt-4">
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              first name
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
              type="text"
              required
              defaultValue={profile.first_name}
              ref={register}
              name="first_name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              last name
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
              type="text"
              required
              defaultValue={profile.last_name}
              ref={register}
              name="last_name"
            />
          </div>
        </div>
        <div className="w-full md:w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            user name
          </label>
          <input
            className="appearance-none block w-full bg-white text-gray-700 border border-gray-300 .shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
            type="text"
            required
            defaultValue={profile.username}
            ref={register}
            name="username"
          />
        </div>
        <div className="w-full md:w-full px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Bio
          </label>
          <textarea
            className="bg-gray-50 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 .shadow-inner border border-gray-300 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            defaultValue={profile.bio}
            ref={register}
            name="bio"
          />
        </div>
        <h2 className="text-2xl text-gray-900 px-3">Notifications</h2>
        <div className="w-full md:w-full px-3 mb-6 mt-4">
          <div className="flex w-96 justify-between items-baseline">
            <label htmlFor="horns">
              Receive email digests you subscribed to
            </label>
            <input
              type="checkbox"
              className="rounded text-blue-600 border-2 border-gray-300"
              id="horns"
              name="horns"
              defaultChecked={
                profile.settings?.find(
                  (setting) => setting.key === 'send_email_digest'
                ).value
              }
              ref={register}
              name="send_email_digest"
            />
          </div>
          <div className="flex w-96 justify-between items-baseline mt-3">
            <label htmlFor="horns2">You're @mentioned in a comment</label>
            <input
              type="checkbox"
              className="rounded text-blue-600 border-2 border-gray-300"
              id="horns2"
              name="horns2"
              defaultChecked={
                profile.settings?.find(
                  (setting) => setting.key === 'notify_comment_mentions_web'
                ).value
              }
              ref={register}
              name="notify_comment_mentions_web"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className=".disabled:opacity-50 disabled:bg-gray-400 appearance-none bg-blue-600 text-white px-4 py-1 shadow-sm rounded-full mr-3 uppercase text-sm"
            type="submit"
            disabled={isEmpty(formState.dirtyFields) || isSavingSettings}
          >
            {isSavingSettings ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  </form>
)
