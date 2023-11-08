import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Components/Navbar/navbar";
import { Footer } from "./Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./providers";
import UserDataProvider from "./Contexts/UserDataProvider/UserDataProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PHP Hospital",
  description: "Generated by create next app",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>
      <body className={inter.className}>
        <NextTopLoader color="#000000" showSpinner={false} />
        <AuthProvider>
          <UserDataProvider>
            <Navbar></Navbar>
            <div className="overflow-y-auto pb-12">{children}</div>
            <Footer></Footer>
            <ToastContainer />
          </UserDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
