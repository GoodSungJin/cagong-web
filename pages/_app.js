import '../styles/globals.css'
import axios from 'axios';

axios.defaults.baseURL = "https://ukklugbx3d.execute-api.ap-northeast-2.amazonaws.com/cagong";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
