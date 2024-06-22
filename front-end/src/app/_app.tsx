import { Component } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App ({ Component , pageProps } : AppProps) {
    return (
        <BrowserRouter>
        <Component {...pageProps} />
      </BrowserRouter>
    )
} 