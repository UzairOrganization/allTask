"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvide/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthProvider from "@/redux/authProvider";
import AppProviders from "@/lib/AppProvider";


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
    <html lang="en" >
  <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
    >
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}

          <div>
            <a
              href="https://t.me/AllTasko_Bot"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "fixed",
                bottom: "30px",
                right: "20px",
                backgroundColor: "#008b6e",
                color: "white",
                padding: "12px 20px",
                fontSize: "16px",
                borderRadius: "50px",
                textDecoration: "none",
                fontFamily: "sans-serif",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                alt="Telegram logo"
                width="24"
                height="24"
              />
              Chat with us
            </a>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </body>
</html>
  );
}
