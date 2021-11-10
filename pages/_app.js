import { AuthContext } from '../context/AuthContext'
import '../styles/styles.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  )
}

export default MyApp
