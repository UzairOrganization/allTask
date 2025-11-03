import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "@/ClientWapper/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AllTasko",
  description: "Professional Service Platform",
  icons: {
    icon: "/assets/images/resource/jpeg-03.ico",
    shortcut: "/assets/images/resource/jpeg-03.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
