import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </div>
  );
}
