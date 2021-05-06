import App from "next/app";
import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { getStrapiMedia } from "../utils/media";
import { getStrapiURL, getGlobalData } from "../utils/api";
import Layout from "../components/layout";
import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import { NextPage } from "next";

import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../styles/index.css";
import PrimeReact from "primereact/api";
import DashboardLayout from "../components/dashboard-layout";

export interface PageProps {
	global: Record<string, any>;
	path: string;
}

// @ts-ignore
const MyApp: NextPage<AppProps<PageProps>> = ({ Component, pageProps }: any) => {
	// Prevent Next bug when it tries to render the [[...slug]] route
	PrimeReact.ripple = true;

	const router = useRouter();
	if (router.asPath === "/[[...slug]]") {
		return null;
	}

	// Extract the data we need
	const { global } = pageProps as PageProps;
	if (global == null) {
		return <ErrorPage statusCode={404} />;
	}
	const { metadata } = global;

	return (
		<>
			{/* Favicon */}
			<Head>
				<link rel="shortcut icon" href={getStrapiMedia(global.favicon.url)} />
			</Head>
			{/* Global site metadata */}
			<DefaultSeo
				titleTemplate={`%s | ${global.metaTitleSuffix}`}
				title={"Page"}
				description={metadata.metaDescription}
				openGraph={{
					images: Object.values(metadata.shareImage.formats).map((image: any) => {
						return {
							url: getStrapiMedia(image.url),
							width: image.width,
							height: image.height,
						};
					}),
				}}
				twitter={{
					cardType: metadata.twitterCardType,
					handle: metadata.twitterUsername,
				}}
			/>
			{/* Display the content */}
			<Layout global={global}>
				{router.pathname.startsWith("/dashboard") ? (
					<DashboardLayout>
						<Component {...pageProps}></Component>
					</DashboardLayout>
				) : (
					<Component {...pageProps} />
				)}
			</Layout>
		</>
	);
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
// @ts-ignore
MyApp.getInitialProps = async (ctx: any) => {
	// Calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(ctx);
	// Fetch global site settings from Strapi
	const global = await getGlobalData();
	// Pass the data to our page via props
	return { ...appProps, pageProps: { global, path: ctx.pathname } };
};

export default MyApp;
