import type { AppProps } from "next/app";
import { wrapper } from "@/store/store";
import { GlobalStyle } from "@/styles/global";
import { Open_Sans } from "@next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const open = Open_Sans({
  weight: ["300", "500", "600", "800"],
  style: ["normal"],
  subsets: ["latin"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`app ${open.className}`}>
      <GlobalStyle />
      <ToastContainer />
      <Component {...pageProps} />
    </main>
  );
}

export default wrapper.withRedux(App);
