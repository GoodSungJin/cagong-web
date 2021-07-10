import '../styles/globals.css';
import '../styles/reset.css';
import 'swiper/swiper-bundle.css';

import theme from "../styles/theme";
import {ThemeProvider} from "@emotion/react";

function MyApp({ Component, pageProps }) {
  return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
  );
}

export default MyApp
