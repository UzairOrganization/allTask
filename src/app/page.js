import Image from "next/image";
import Script from "next/script";
import generateStylesheetObject from "@/common/generateStylesheetsObject";
import SearchPopup from "@/components/SearchPopup/page";
import Header from "@/components/Header/index";
import MobileMenu from "@/components/MobileMenu/page";
import BannerSection from "@/components/BannerSection/page";
import ProjectSection from "@/components/ProjectSection/page";
import TestimonialSection from "@/components/TestimonialSection/page";
import Footer from "@/components/Footer/page";
import Discover from "@/components/DiscoverSection/Discover";
import Trending from "@/components/TrendingServicesSections/Trending";
import AppSection from "@/components/AppSection/AppSection";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToogle";
import "@/assets/css/homepage.css"
export const metadata = {
  title: "AllTasko",
  icons: {
    icon: "/assets/imgs/logo/logo.ico",
    shortcut: "/assets/imgs/favicon.ico",
  },
};
export default function Home() {

  return (
    <>
      <body>
        <div className="boxed_wrapper ltr">
          <SearchPopup />
          <Header />
          <MobileMenu />
          <BannerSection />
          <Discover />
          <Trending />
          <AppSection />
          <ProjectSection />
          <TestimonialSection />
          <Footer />
        </div>
      </body>
      {/* <ClientScripts /> */}
      
    </>
  );
}
