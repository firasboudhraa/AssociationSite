import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
