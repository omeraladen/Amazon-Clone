import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'

const MyApp = ({ Component, pageProps, session  }) => {
  return (
  <Provider store={store}>
     <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
  </Provider>

  
  )
}

export default MyApp;
