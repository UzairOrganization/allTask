import Image from "next/image";
import Script from "next/script";
import generateStylesheetObject from "@/common/generateStylesheetsObject";
import SearchPopup from "@/components/SearchPopup/page";
import Header from "@/components/Header/page";
import MobileMenu from "@/components/MobileMenu/page";
import BannerSection from "@/components/BannerSection/page";
import ProjectSection from "@/components/ProjectSection/page";
import TestimonialSection from "@/components/TestimonialSection/page";
import Footer from "@/components/Footer/page";
import Discover from "@/components/DiscoverSection/Discover";
import Trending from "@/components/TrendingServicesSections/Trending";
import AppSection from "@/components/AppSection/AppSection";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToogle";
export const metadata = {
  title: "AllTasko",
  icons: {
    icon: "/assets/imgs/logo/logo.ico",
    shortcut: "/assets/imgs/favicon.ico",
    other: generateStylesheetObject([
      "/assets/css/font-awesome-all.css",
      "/assets/css/flaticon.css",
      "/assets/css/owl.css",
      "/assets/css/bootstrap.css",
      "/assets/css/jquery.fancybox.min.css",
      "/assets/css/animate.css",
      "/assets/css/nice-select.css",
      "/assets/css/elpath.css",
      "/assets/css/color/theme-color.css",
      "/assets/css/switcher-style.css",
      "/assets/css/rtl.css",
      "/assets/css/style.css",
      "/assets/css/module-css/banner.css",
      "/assets/css/module-css/about.css",
      "/assets/css/module-css/service.css",
      "/assets/css/module-css/service-intro.css",
      "/assets/css/module-css/clients.css",
      "/assets/css/module-css/chooseus.css",
      "/assets/css/module-css/project.css",
      "/assets/css/module-css/video.css",
      "/assets/css/module-css/testimonial.css",
      "/assets/css/module-css/news.css",
      "/assets/css/module-css/cta.css",
      "/assets/css/module-css/discover.css",
      "/assets/css/responsive.css",
      "https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    ]),
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
      <Script src="/assets/js/jquery.js" strategy="beforeInteractive" />
      {/* <Script src="/assets/js/bootstrap.min.js" strategy="beforeInteractive" /> */}
      <Script strategy="beforeInteractive" src="/assets/js/owl.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/wow.js"></Script>
     

      {/* <Script src="/assets/js/smoother-script.js" strategy="lazyOnload" /> */}

      <Script src="/assets/js/script.js"></Script>
    </>
  );
}
