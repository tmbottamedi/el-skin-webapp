"use client";

import { Provider } from "react-redux";
import { store } from "store";
import Header from "components/Header";
import Footer from "components/Footer";
import "styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>AL SKIN</title>
        <meta name="description" content="Sobre a AL SKIN" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider store={store}>
          <Header />
          <div id="root">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
