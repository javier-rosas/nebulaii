import 'focus-visible'
import '@/styles/tailwind.css'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  )
}
