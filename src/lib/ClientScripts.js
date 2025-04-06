"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Detect route changes
import Loader from "./Loader";

export default function ClientScripts() {
  const [loading, setLoading] = useState(true); // Track loading state
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false; // Ensure scripts load in order
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        // Load scripts in order
        await loadScript("/assets/js/jquery.js");
        // await loadScript("/assets/js/owl.js");
        await loadScript("/assets/js/wow.js");
        await loadScript("/assets/js/script.js");

        // Once scripts are loaded, hide the loader
        setLoading(false);
      } catch (error) {
        console.error("Error loading scripts", error);
        setLoading(false); // In case of an error, hide the loader as well
      }
    };

    // Load scripts whenever the route changes
    loadAllScripts();

    // Cleanup function to remove scripts
    return () => {
      document.querySelectorAll("script").forEach((script) => {
        if (
          script.src.includes("jquery.js") ||
        //   script.src.includes("owl.js") ||
        //   script.src.includes("wow.js") ||
          script.src.includes("script.js")
        ) {
          script.remove();
        }
      });
    };
  }, [pathname]); // Trigger whenever the pathname (route) changes

  return loading ? <Loader /> : null; // Show loader until scripts are loaded
}
