import Head from "next/head";
import { AppProps } from "next/app";
import { DAppProvider } from "@usedapp/core";

import Navbar from "../containers/Navbar";
import Footer from "../containers/Footer";
import web3 from "../configs/web3";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<DAppProvider config={web3}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Navbar />
			<Component {...pageProps} />
			<Footer />
		</DAppProvider>
	);
}
