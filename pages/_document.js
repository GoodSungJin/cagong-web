import Document, { Head, Html, Main, NextScript } from "next/document";
import {ThemeProvider} from "@emotion/react";
import theme from "../styles/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
	      <Head>
		      {/*<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=65bae45a862fb7fc54faed710e99f1d2"></script>*/}
		      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=8e1c50f0b1f88741b88511273f974939"></script>
	      </Head>
        <body>
	        <ThemeProvider theme={theme}>
	          <Main />
	        </ThemeProvider>
          <NextScript />
          <style jsx global>{`
            #__next {
              height: 100%;
            }
          `}
          </style>
        </body>
      </Html>
    );
  }
}
