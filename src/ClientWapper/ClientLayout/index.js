"use client";

import { ThemeProvider } from "@/components/ThemeProvide/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthProvider from "@/redux/authProvider";

export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}

          {/* Telegram Floating Button */}
          <a
            href="https://t.me/AllTasko_Bot"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "fixed",
              bottom: "30px",
              left: "20px",
              backgroundColor: "#008b6e",
              color: "white",
              padding: "20px 20px",
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
            {/* Chat with us */}
          </a>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}
