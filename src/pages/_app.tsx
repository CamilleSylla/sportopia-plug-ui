import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ClientOnly from "@/components/ClientOnly";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <ClientOnly>
          <div className={poppins.className}>
            <Component {...pageProps} />
          </div>
        </ClientOnly>
      </ApolloProvider>
    </SessionProvider>
  );
}
