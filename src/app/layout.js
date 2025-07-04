"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvide/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthProvider from "@/redux/authProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <AuthProvider>
            <ThemeProvider attribute="class"
              defaultTheme="light"
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
