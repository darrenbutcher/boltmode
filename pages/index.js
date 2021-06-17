/* eslint-disable react/button-has-type */
import { useRef, useEffect } from 'react'
import { FittingSVG, Head } from '@/atoms'

function Home({ user, stripeCustomer }) {
  const fittingContainerRef = useRef()

  return (
    <div className="">
      <header className=".bg-white md:mt-12">
        <div className=".container w-full mx-auto .px-6 md:py-16">
          <div className="md:flex .items-center">
            <div className="w-full md:w-1/2">
              <div className="max-w-lg mt-8">
                <h1 className="md:leading-tight text-gray-600 dark:text-white text-3xl font-bold uppercase md:text-6xl">
                  The new way to run your app {user?.first_name}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-white text-lg">
                  NextJS appliction running on bolts. {stripeCustomer?.id}
                </p>
                <button className="mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded-full hover:bg-blue-500 focus:outline-none focus:bg-indigo-500 px-4">
                  Get started
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
              <div
                className="max-w-2xl w-full .h-full .p-2 mt-8 md:mt-0 md:ml-4 lg:ml-0"
                ref={fittingContainerRef}
              >
                <FittingSVG parentRef={fittingContainerRef} animate />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div style={{ zIndex: '-99999' }} className="absolute .bg-footer-texture w-screen bottom-0 left-0 .h-24 .bg-red-500 .text-green-500 .opacity- .opacity-20 .animate-pulse">
        <svg style={{ height: '360px' }} className="text-indigo-100 dark:text-alt-black-lighter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="currentColor" fill-opacity="1" d="M0,64L1440,192L1440,320L0,320Z"></path></svg>
      </div>
    </div>
  )
}

// Home.getLayout = getLayout
Home.title = 'Boltmode Now'
export default Home
