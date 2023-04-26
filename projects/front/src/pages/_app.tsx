import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'reduxjs/toolkit'
import store from '../redux/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) 
  
}
