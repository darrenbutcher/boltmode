import { useDarkmode } from '@/lib'
import { useEffect, useState } from 'react'
// import { useTheme } from 'next-themes'
function Pricing() {
  const [toggleDarkMode] = useDarkmode()

  // why does these comments need to stay for dark mode to work?
  // const [isMounted, setIsMounted] = useState(false)
  // // const { theme, setTheme } = useTheme()

  // useEffect(() => setIsMounted(true), [])

  //const switchTheme = () => {
    // console.log(theme)
    // console.log(isMounted)  // const [isMounted, setIsMounted] = useState(false)
  // // const { theme, setTheme } = useTheme()

  // useEffect(() => setIsMounted(true), [])
    // if (isMounted) {
    //   setTheme(theme === "light" ? "dark" : "light")
    // }
  //}

  return (
    <>
      {/* component */}
      <button onClick={toggleDarkMode}>Change theme</button>
      <div className="container flex flex-wrap pt-4 pb-10 m-auto mt-6 dark:bg-alt-black md:mt-15 lg:px-12 xl:px-16">
        <div className="w-full px-0 lg:px-4">
          <h2 className="px-12 text-base font-bold text-center text-gray-600 md:text-2xl">
            Choose your plan
          </h2>
          <p className="py-1 mb-10 text-sm text-center text-gray-500">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <div className="flex flex-wrap items-center justify-center py-4 pt-0">
            <div className="w-full p-4 md:w-1/2 lg:w-1/4 plan-card">
              <label className="relative flex flex-col shadow-lg cursor-pointer rounded-xl group hover:shadow-2xl">
                <div className="w-full px-4 py-6 rounded-t-xl card-section-1">
                  <h3 className="mx-auto text-base font-semibold text-center .underline text-blue-500 .group-hover:text-white">
                    Standard
                  </h3>
                  <p className="text-5xl font-bold text-center .group-hover:text-white text-blue-500">
                    Free
                    {/* $25.<span className="text-3xl">95</span> */}
                  </p>
                  <p className="text-xs text-center uppercase .group-hover:text-white text-blue-500">
                    forever
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full py-6 bg-blue-500 rounded-b-xl">
                  {/* <p className="text-xl text-white">1 month</p> */}
                  <button className="w-5/6 py-2 mt-2 font-semibold text-center text-blue-500 uppercase bg-white border border-transparent rounded">
                    Get Started
                  </button>
                </div>
              </label>
            </div>
            <div className="w-full p-4 md:w-1/2 lg:w-1/4">
              <label className="relative flex flex-col shadow-lg cursor-pointer rounded-xl hover:shadow-2xl">
                <div className="w-full px-4 py-8 bg-blue-500 rounded-t-xl">
                  <h3 className="mx-auto text-base font-semibold text-center .underline text-white group-hover:text-white">
                    Premium
                  </h3>
                  <p className="text-5xl font-bold text-center text-white">
                    $5.<span className="text-3xl">00</span>
                  </p>
                  <p className="text-xs text-center text-white uppercase">
                    monthly
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full py-6 rounded-b-xl bg-blue-500 .bg-blue-700">
                  {/* <p className="text-xl text-white">3 months</p> */}
                  <button className="w-5/6 py-2 mt-2 font-semibold text-center text-blue-500 uppercase bg-white border border-transparent rounded">
                    Upgrade
                  </button>
                </div>
              </label>
            </div>
            <div className="w-full p-4 md:w-1/2 lg:w-1/4 plan-card">
              <label className="relative flex flex-col shadow-lg cursor-pointer rounded-xl group card-group hover:bg-jblue-secondary hover:shadow-2xl">
                <div className="w-full px-4 py-6 rounded-t-xl card-section-1">
                  <h3 className="mx-auto text-base font-semibold text-center .underline text-blue-500 .group-hover:text-white">
                    Elite
                  </h3>
                  <p className="text-5xl font-bold text-center .group-hover:text-white text-blue-500">
                    $12.<span className="text-3xl">00</span>
                  </p>
                  <p className="text-xs text-center uppercase .group-hover:text-white text-blue-500">
                    monthly
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full py-6 bg-blue-500 rounded-b-xl">
                  {/* <p className="text-xl text-white">6 months</p> */}
                  <button className="w-5/6 py-2 mt-2 font-semibold text-center text-blue-500 uppercase bg-white border border-transparent rounded">
                    Upgrade
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  //   return (
  //     <>
  // {/* component */}
  // <section>
  //   <div className="container max-w-full px-6 py-24 mx-auto">
  //     <h1 className="text-4xl font-medium leading-snug tracking-wider text-center text-black">
  //       Pricing
  //     </h1>
  //     <p className="px-6 mt-2 text-lg text-center text-gray-700">
  //       Sed ut perspiciatis unde omnis iste natus error sit voluptatem
  //       accusantium doloremque laudantium, totam rem aperiam.
  //     </p>
  //     <div className="w-24 h-1 mx-auto mt-4 bg-indigo-200 rounded opacity-75" />
  //     <div className="max-w-full mx-auto my-3 md:max-w-6xl md:px-8">
  //       <div className="relative flex flex-col items-center block md:flex-row">
  //         <div className="relative z-0 w-11/12 max-w-sm my-8 rounded-lg shadow-lg sm:w-3/5 lg:w-1/3 sm:my-5 md:-mr-4">
  //           <div className="overflow-hidden text-black bg-white rounded-lg shadow-lg shadow-inner">
  //             <div className="block max-w-sm px-8 mx-auto mt-2 text-sm text-left text-black sm:text-md lg:px-6">
  //               <h1 className="p-3 pb-0 text-lg font-medium tracking-wide text-center uppercase">
  //                 Hobby
  //               </h1>
  //               <h2 className="pb-6 text-sm text-center text-gray-500">FREE</h2>
  //               Stripe offers everything needed to run an online business
  //               at scale. Get in touch for details.
  //             </div>
  //             <div className="flex flex-wrap px-6 mt-3">
  //               <ul>
  //                 <li className="flex items-center">
  //                   <div className="p-2 text-green-700 rounded-full fill-current ">
  //                     <svg className="w-6 h-6 align-middle" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  //                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  //                       <polyline points="22 4 12 14.01 9 11.01" />
  //                     </svg>
  //                   </div>
  //                   <span className="ml-3 text-lg text-gray-700">No setup</span>
  //                 </li>
  //                 <li className="flex items-center">
  //                   <div className="p-2 text-green-700 rounded-full fill-current ">
  //                     <svg className="w-6 h-6 align-middle" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  //                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  //                       <polyline points="22 4 12 14.01 9 11.01" />
  //                     </svg>
  //                   </div>
  //                   <span className="ml-3 text-lg text-gray-700">No setups</span>
  //                 </li>
  //                 <li className="flex items-center">
  //                   <div className="p-2 text-green-700 rounded-full fill-current ">
  //                     <svg className="w-6 h-6 align-middle" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  //                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  //                       <polyline points="22 4 12 14.01 9 11.01" />
  //                     </svg>
  //                   </div>
  //                   <span className="ml-3 text-lg text-gray-700">Speed</span>
  //                 </li>
  //               </ul>
  //             </div>
  //             <div className="flex items-center block p-8 uppercase">
  //               <button className="block w-full px-6 py-3 mt-3 text-lg font-semibold text-white bg-black rounded-lg shadow-xl // hover:bg-gray-700">
  //                 Select
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="relative z-10 w-full max-w-md my-8 bg-white rounded-lg shadow-lg sm:w-2/3 lg:w-1/3 sm:my-5">
  //           <div className="py-4 text-sm font-semibold leading-none tracking-wide text-center text-black uppercase bg-gray-200 rounded-t-lg">
  //             Most Popular
  //           </div>
  //           <div className="block max-w-sm px-8 mx-auto mt-2 text-sm text-left text-black sm:text-md lg:px-6">
  //             <h1 className="p-3 pb-0 text-lg font-medium tracking-wide text-center uppercase">
  //               Expert
  //             </h1>
  //             <h2 className="pb-6 text-sm text-center text-gray-500"><span className="text-3xl">€19</span> /mo</h2>
  //             Stripe offers everything needed to run an online business at
  //             scale. Get in touch for details.
  //           </div>
  //           <div className="flex justify-start pl-12 mt-3 sm:justify-start">
  //             <ul>
  //               <li className="flex items-center">
  //                 <div className="p-2 text-green-700 rounded-full fill-current">
  //                   <svg className="w-6 h-6 align-middle" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  //                     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  //                     <polyline points="22 4 12 14.01 9 11.01" />
  //                   </svg>
  //                 </div>
  //                 <span className="ml-3 text-lg text-gray-700">No setup</span>
  //               </li>
  //               <li className="flex items-center">
  //                 <div className="p-2 text-green-700 rounded-full fill-current ">
  //                   <svg className="w-6 h-6 align-middle" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  //                     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  //                     <polyline points="22 4 12 14.01 9 11.01" />
  //                   </svg>
  //                 </div>
  //                 <span className="ml-3 text-lg text-gray-700">Hidden fees</span>
  //               </li>
  //               <li className="flex items-center">
  //                 <div className="p-2 text-green-700 rounded-full fill-current ">
  //                   <svg className="w-6 h-6 align-middle" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  //                     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  //                     <polyline points="22 4 12 14.01 9 11.01" />
  //                   </svg>
  //                 </div>
  //                 <span className="ml-3 text-lg text-gray-700">Original</span>
  //               </li>
  //             </ul>
  //           </div>
  //           <div className="flex items-center block p-8 uppercase">
  //             <button className="block w-full px-6 py-3 mt-3 text-lg font-semibold text-white bg-black rounded-lg shadow-xl // hover:bg-gray-700">
  //               Select
  //             </button>
  //           </div>
  //         </div>
  //         <div className="relative z-0 w-11/12 max-w-sm my-8 rounded-lg shadow-lg sm:w-3/5 lg:w-1/3 sm:my-5 md:-ml-4">
  //           <div className="overflow-hidden text-black bg-white rounded-lg shadow-lg shadow-inner">
  //             <div className="block max-w-sm px-8 mx-auto mt-2 text-sm text-left text-black sm:text-md lg:px-6">
  //               <h1 className="p-3 pb-0 text-lg font-medium tracking-wide text-center uppercase">
  //                 Enteprise
  //               </h1>
  //               <h2 className="pb-6 text-sm text-center text-gray-500">€39 /mo</h2>
  //               Stripe offers everything needed to run an online business
  //               at scale. Get in touch for details.
  //             </div>
  //             <div className="flex flex-wrap px-6 mt-3">
  //               <ul>
  //                 <li className="flex items-center">
  //                   <div className="p-2 text-green-700 rounded-full fill-current ">
  //                     <svg className="w-6 h-6 align-middle" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  //                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  //                       <polyline points="22 4 12 14.01 9 11.01" />
  //                     </svg>
  //                   </div>
  //                   <span className="ml-3 text-lg text-gray-700">Electric</span>
  //                 </li>
  //                 <li className="flex items-center">
  //                   <div className="p-2 text-green-700 rounded-full fill-current ">
  //                     <svg className="w-6 h-6 align-middle" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  //                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  //                       <polyline points="22 4 12 14.01 9 11.01" />
  //                     </svg>
  //                   </div>
  //                   <span className="ml-3 text-lg text-gray-700">Monthly</span>
  //                 </li>
  //                 <li className="flex items-center">
  //                   <div className="p-2 text-green-700 rounded-full fill-current ">
  //                     <svg className="w-6 h-6 align-middle" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
  //                       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
  //                       <polyline points="22 4 12 14.01 9 11.01" />
  //                     </svg>
  //                   </div>
  //                   <span className="ml-3 text-lg text-gray-700">No setup</span>
  //                 </li>
  //               </ul>
  //             </div>
  //             <div className="flex items-center block p-8 uppercase">
  //               <button className="block w-full px-6 py-3 mt-3 text-lg font-semibold text-white bg-black rounded-lg shadow-xl // hover:bg-gray-700">
  //                 Select
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </section>
  // </>
  //   )
}

export default Pricing


