import '../styles/globals.css'
import '../styles/reset.css';
import 'swiper/swiper-bundle.css';
import 'lightbox-react/style.css';
import theme from "../styles/theme";
import { ThemeProvider } from "@emotion/react";
import axios from 'axios';

axios.defaults.baseURL = "https://ukklugbx3d.execute-api.ap-northeast-2.amazonaws.com/cagong";

function MyApp({ Component, pageProps }) {
  return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
  );
}

export default MyApp
