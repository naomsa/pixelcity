import { Html, Head, Main, NextScript } from "next/document";

export default function MyDocument() {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="description"
					content="Pixel City is a colection of pixelated characters in the ethereum blockchain, forever..."
				/>
			</Head>
			<body className="text-background bg-background">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
