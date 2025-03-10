import Image from "next/image";
import Script from "next/script";
import generateStylesheetObject from "@/common/generateStylesheetsObject";
import PageDirection from "@/components/PageDirection/page";
import SwitcherMenu from "@/components/SwitcherMenu/page";
import SearchPopup from "@/components/SearchPopup/page";
import Header from "@/components/Header/page";
import MobileMenu from "@/components/MobileMenu/page";
import BannerSection from "@/components/BannerSection/page";
import AboutSection from "@/components/AboutSection/page";
import ServiceSection from "@/components/ServiceSection/page";
import ProjectSection from "@/components/ProjectSection/page";
import VideoSection from "@/components/VideoSection/page";
import TestimonialSection from "@/components/TestimonialSection/page";
import CtaSection from "@/components/CtaSection/page";
import Footer from "@/components/Footer/page";
import ScrollToTop from "@/components/ScrollToTop/page";
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
          <PageDirection/>

     {/* <!-- switcher menu --> */}
          <SwitcherMenu/>
          {/* <!-- end switcher menu -->

      <!--Search Popup--> */}
          <SearchPopup/>

          {/* <!-- main header --> */}
            {/* <!-- header-top -->

        <!-- header-lower --> */}
            <Header/>
          {/* <!-- main-header end -->

      <!-- Mobile Menu  --> */}
          <MobileMenu/>
          {/* <!-- End Mobile Menu -->

      <!-- banner-section --> */}
         <BannerSection/>
          {/* <!-- banner-section end -->

      <!-- about-section --> */}
          <AboutSection/>
          {/* <!-- about-section end -->

      <!-- service-section --> */}
          <ServiceSection/>
          {/* <!-- service-section end -->

      <!-- project-section --> */}
          <ProjectSection/>
          {/* <!-- project-section end -->

      <!-- video-section --> */}
          <VideoSection/>
          {/* <!-- video-section end -->

      <!-- testimonial-section --> */}
        <TestimonialSection/>
          {/* <!-- testimonial-section end -->

      <!-- cta-section --> */}
          <CtaSection/>
          {/* <!-- cta-section end -->

      <!-- main-footer --> */}
          <Footer/>
          {/* <!-- main-footer end --> */}

          {/* <!--Scroll to top--> */}
          <ScrollToTop/>
          {/* <!-- Scroll to top end --> */}
        </div>
      </body>
      <Script src="/assets/js/jquery.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap.min.js" strategy="beforeInteractive" />

      <Script strategy="beforeInteractive" src="/assets/js/owl.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/wow.js"></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/validation.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/jquery.fancybox.js"
      ></Script>

      <Script strategy="beforeInteractive" src="/assets/js/appear.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/isotope.js"></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/parallax-scroll.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/jquery.nice-select.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/jQuery.style.switcher.min.js"
      ></Script>

      {/* <Script src="/assets/js/smoother-script.js" strategy="lazyOnload" /> */}

      <Script src="/assets/js/script.js"></Script>
    </>
  );
}
