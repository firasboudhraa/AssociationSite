import Head from "next/head";
import Button from "@/app/_document";
import Navbar from "../components/molecules/Navbar";


export default function Home() {
  return (
    <>
      <Head>
        <title> Association Site </title>
        <meta name="description" content="Description ..." />
        <meta name="viewport" content="width-device-width , initial-scale =1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
    </>
  );
}
