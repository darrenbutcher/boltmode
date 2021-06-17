import PropTypes from 'prop-types'
import { Header } from '../organisms'
import dynamic from 'next/dynamic'
import { isClient, usePreEffect } from '@/lib'
import { useState, useEffect } from 'react'

const DynamicComponent = dynamic(() => import('../organisms/cookie-consent'))

export default function MainLayout({ children }) {
  const [isA, setIsA] = useState()
  useEffect(() => {
    if (isClient) {
    const a = localStorage.getItem(process.env.NEXT_PUBLIC_LOCALSTORAGE_LOGIN_KEY) === 'true' ? true : false
    setIsA(a)
    }
  }, [isA])

  return (
    <div>
      <Header blue={isA} />
      <div className="px-6 pt-16 h-full .max-w-xl mx-auto .bg-red-500 container">
        {children}
      </div>
      <DynamicComponent fallbackDelay={20000} />
    </div>
  )
}

export const getLayout = (page) => <MainLayout>{page}</MainLayout>

MainLayout.propTypes = {
  children: PropTypes.any,
}
