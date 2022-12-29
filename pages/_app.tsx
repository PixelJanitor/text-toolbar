import { LazyMotion, domMax } from 'framer-motion'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { toastOptions } from 'toaster.config.js'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' forcedTheme='light'>
      <LazyMotion features={domMax} strict>
        <Component {...pageProps} />
        <Toaster position='bottom-left' toastOptions={toastOptions} />
      </LazyMotion>
    </ThemeProvider>
  )
}
