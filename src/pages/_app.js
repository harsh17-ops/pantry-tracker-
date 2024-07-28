import '../styles/globals.css'
import Dashboard from '../components/Dashboard'
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Dashboard />
      <Component {...pageProps} />
    </div>
  )
}
export default MyApp
