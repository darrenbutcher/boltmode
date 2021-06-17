import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const useDarkmode = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setIsMounted(true), [])
  const isThemeDark = theme === 'dark' ? true : false 

  const toggleDarkMode = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  return [toggleDarkMode, isThemeDark]
}

export default useDarkmode
