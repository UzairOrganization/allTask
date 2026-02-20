"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvide/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthProvider from "@/redux/authProvider";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Load Replain once
  useEffect(() => {
    if (!document.getElementById("replain-script")) {
      window.replainSettings = {
        id: "7ec90b9b-bcc5-4dfb-894a-b368db5c5f7a",
        position: "left",
      };

      const script = document.createElement("script");
      script.src = "https://widget.replain.cc/dist/client.js";
      script.async = true;
      script.id = "replain-script";
      document.body.appendChild(script);
    }
  }, []);

  // Hide / Show on route change
  useEffect(() => {
    const shouldHide =
      pathname.startsWith("/chat/user") ||
      pathname.startsWith("/chat/professional");

    const interval = setInterval(() => {
      const replainIframe = document.querySelector(
        "iframe[src*='replain']"
      );

      if (replainIframe) {
        replainIframe.style.display = shouldHide ? "none" : "block";
      }
    }, 300);

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}