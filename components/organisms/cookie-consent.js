import CookieConsent from "react-cookie-consent"
import { useState, useEffect } from 'react'

const Component = ({ fallbackDelay }) => {
  const [delayed, setDelayed] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), fallbackDelay)
    return () => clearTimeout(timeout)
  }, [])


  const render = () => {
    return (
      <CookieConsent
      enableDeclineButton
      onDecline={() =>
        {alert("nay!");
      }}
      disableStyles={true}
      buttonText="Got it"
      location="bottom"
      buttonClasses="block .border .border-purple-200 .text-gray-500 bg-blue-600 text-white rounded-full px-6 py-2 text-center font-bold disabled:bg-gray-200"
      containerClasses="border-t border-gray-100 w-full .container bg-white space-y-4 px-96 pt-4 pb-6 .absolute bottom-0 left-0 fixed z-100"
      contentClasses="mx-auto"
      buttonWrapperClasses="flex space-x-4 items-center justify-center"
      declineButtonClasses="bg-white text-blue-600 border .border-blue-600 rounded-full dark:border-gray-700 px-6 py-2 text-center font-bold" 
    > 
      <p class="font-bold text-2xl uppercase text-center">We love cookies</p>
      <div className="flex space-x-2 items-baseline mt-6">
        <svg
          x="0px"
          y="0px"
          viewBox="0 0 496.933 496.933"
          className="w-8 animate-float self-end"
          >
          <path
            d="M435.2 238.933c-25.446 0-47.607-13.952-59.349-34.603a85.503 85.503 0 01-8.917.469c-47.13 0-85.333-38.204-85.333-85.333 0-13.312 3.14-25.865 8.576-37.094C270.276 75.349 256 56.431 256 34.133c0-12.681 4.634-24.26 12.262-33.195C261.402.367 254.481 0 247.467 0 110.797 0 0 110.797 0 247.467s110.797 247.467 247.467 247.467 247.467-110.797 247.467-247.467c0-13.193-1.058-26.129-3.046-38.767-12.255 18.235-33.068 30.233-56.688 30.233"
            fill="#a46f3e"
            transform="translate(1 1)"
          />
          <path
            d="M435.2 238.933c-25.446 0-47.607-13.952-59.349-34.603a85.503 85.503 0 01-8.917.469c-47.13 0-85.333-38.204-85.333-85.333 0-13.312 3.14-25.865 8.576-37.094C270.276 75.349 256 56.431 256 34.133c0-12.681 4.634-24.26 12.262-33.195C261.402.367 254.481 0 247.467 0 110.797 0 0 110.797 0 247.467s110.797 247.467 247.467 247.467 247.467-110.797 247.467-247.467c0-13.193-1.058-26.129-3.046-38.767-12.255 18.235-33.068 30.233-56.688 30.233h0z"
            fill="none"
            stroke="#a46f3e"
            strokeWidth={2}
            transform="translate(1 1)"
          />
          <path
            d="M179.2 179.2c0-23.561-19.106-42.667-42.667-42.667S93.867 155.639 93.867 179.2s19.106 42.667 42.667 42.667S179.2 202.761 179.2 179.2"
            fill="#6a3311"
            transform="translate(1 1)"
          />
          <path
            d="M179.2 179.2c0-23.561-19.106-42.667-42.667-42.667S93.867 155.639 93.867 179.2s19.106 42.667 42.667 42.667S179.2 202.761 179.2 179.2h0z"
            fill="none"
            stroke="#6a3311"
            strokeWidth={2}
            transform="translate(1 1)"
          />
          <path
            d="M179.2 358.4c0-18.85-15.283-34.133-34.133-34.133s-34.133 15.283-34.133 34.133 15.283 34.133 34.133 34.133S179.2 377.25 179.2 358.4"
            fill="#6a3311"
            transform="translate(1 1)"
          />
          <path
            d="M179.2 358.4c0-18.85-15.283-34.133-34.133-34.133s-34.133 15.283-34.133 34.133 15.283 34.133 34.133 34.133S179.2 377.25 179.2 358.4h0z"
            fill="none"
            stroke="#6a3311"
            strokeWidth={2}
            transform="translate(1 1)"
          />
          <path
            d="M375.467 358.4c0-32.99-26.743-59.733-59.733-59.733S256 325.41 256 358.4s26.743 59.733 59.733 59.733 59.734-26.743 59.734-59.733"
            fill="#6a3311"
            transform="translate(1 1)"
          />
          <path
            d="M375.467 358.4c0-32.99-26.743-59.733-59.733-59.733S256 325.41 256 358.4s26.743 59.733 59.733 59.733 59.734-26.743 59.734-59.733h0z"
            fill="none"
            stroke="#6a3311"
            strokeWidth={2}
            transform="translate(1 1)"
          />
          <path
            d="M283.803 100.388a86.013 86.013 0 016.374-18.014c-19.9-7.023-34.176-25.941-34.176-48.239 0-2.893.307-5.7.768-8.457-.265-.009-.503-.077-.768-.077-23.569 0-42.667 19.098-42.667 42.667 0 23.561 19.098 42.667 42.667 42.667 10.676 0 20.319-4.062 27.802-10.547"
            fill="#6a3311"
            transform="translate(1 1)"
          />
          <path
            d="M283.803 100.388a86.013 86.013 0 016.374-18.014c-19.9-7.023-34.176-25.941-34.176-48.239 0-2.893.307-5.7.768-8.457-.265-.009-.503-.077-.768-.077-23.569 0-42.667 19.098-42.667 42.667 0 23.561 19.098 42.667 42.667 42.667 10.676 0 20.319-4.062 27.802-10.547h0z"
            fill="none"
            stroke="#6a3311"
            strokeWidth={2}
            transform="translate(1 1)"
          />
        </svg>
        <p>This website uses cookies to enhance the user experience.{" "}</p>
        <a href="#" className=".self-end text-xs font-bold text-blue-500 hover:underline">Cookie Policy</a>
      </div>
    </CookieConsent> 
    )
  }

  return(!delayed ? render() : null)
}

export default Component



