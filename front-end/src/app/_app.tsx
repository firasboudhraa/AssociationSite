import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navb from '../components/molecules/nav';
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navb />
      <Component {...pageProps} />
    </div>
  );
}
