import Image from "next/image";
import Script from "next/script";
import generateStylesheetObject from "@/common/generateStylesheetsObject";
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
          {/* <!-- page-direction --> */}
          <div className="page_direction">
            <div className="demo-rtl direction_switch">
              <button className="rtl">RTL</button>
            </div>
            <div className="demo-ltr direction_switch">
              <button className="ltr">LTR</button>
            </div>
          </div>
          {/* <!-- page-direction end -->

      <!-- switcher menu --> */}
          <div className="switcher">
            <div className="switch_btn">
              <button>
                <i className="fas fa-palette"></i>
              </button>
            </div>
            <div className="switch_menu"> 
              {/* <!-- color changer --> */}
              <div className="switcher_container">
                <ul id="styleOptions" title="switch styling">
                  <li>
                    <a
                      href="javascript: void(0)"
                      data-theme="theme-color"
                      className="theme-color"
                    ></a>
                  </li>
                  <li>
                    <a
                      href="javascript: void(0)"
                      data-theme="pink"
                      className="pink-color"
                    ></a>
                  </li>
                  <li>
                    <a
                      href="javascript: void(0)"
                      data-theme="violet"
                      className="violet-color"
                    ></a>
                  </li>
                  <li>
                    <a
                      href="javascript: void(0)"
                      data-theme="crimson"
                      className="crimson-color"
                    ></a>
                  </li>
                  <li>
                    <a
                      href="javascript: void(0)"
                      data-theme="orange"
                      className="orange-color"
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- end switcher menu -->

      <!--Search Popup--> */}
          <div id="search-popup" className="search-popup">
            <div className="popup-inner">
              <div className="upper-box clearfix">
                <figure className="logo-box pull-left">
                  <a href="index.html">
                    <img src="assets/images/logoMain.png" alt="" />
                  </a>
                </figure>
                <div className="close-search pull-right">
                  <span className="far fa-times"></span>
                </div>
              </div>
              <div className="overlay-layer"></div>
              <div className="auto-container">
                <div className="search-form">
                  <form method="post" action="index.html">
                    <div className="form-group">
                      <fieldset>
                        <input
                          type="search"
                          className="form-control"
                          name="search-input"
                          defaultValue=""
                          placeholder="Type your keyword and hit"
                          required
                        />
                        <button type="submit">
                          <i className="far fa-search"></i>
                        </button>
                      </fieldset>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- main header --> */}
          <header className="main-header header-style-one">
            {/* <!-- header-top -->

        <!-- header-lower --> */}
            <div className="header-lower">
              <div className="auto-container">
                <div className="outer-box">
                  <div className="logo-box">
                    <figure className="logo">
                      <a href="index.html">
                        <img src="assets/images/logoMain.png" alt="" />
                      </a>
                    </figure>
                  </div>
                  <div className="menu-area">
                    {/* <!--Mobile Navigation Toggler--> */}
                    <div className="mobile-nav-toggler">
                      <i className="icon-bar"></i>
                      <i className="icon-bar"></i>
                      <i className="icon-bar"></i>
                    </div>
                    <nav className="main-menu navbar-expand-md navbar-light clearfix">
                      <div
                        className="collapse navbar-collapse show clearfix"
                        id="navbarSupportedContent"
                      >
                        <ul className="navigation clearfix">
                          <li className="current dropdown">
                            <a href="index.html">Home</a>
                          </li>
                          <li className="dropdown">
                            <a href="index.html">Services</a>
                          </li>
                          <li className="dropdown">
                            <a href="index.html">Gallery</a>
                          </li>
                          <li className="dropdown">
                            <a href="index.html">Customer Reviews</a>
                          </li>
                          <li className="dropdown">
                            <a href="index.html"> Contact Us</a>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                  <div className="search-box-outer search-toggler">
                    {/* <!-- <i className="icon-4"></i> --> */}
                  </div>
                  <div className="btn-box">
                    <a href="index.html" className="theme-btn btn-two">
                      Get A Quote{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* <!--sticky Header--> */}
            <div className="sticky-header">
              <div className="auto-container">
                <div className="outer-box">
                  <div className="logo-box">
                    <figure className="logo">
                      <a href="index.html">
                        <img src="assets/images/logoMain.png" alt="" />
                      </a>
                    </figure>
                  </div>
                  <div className="menu-area">
                    <nav className="main-menu clearfix">
                      {/* <!--Keep This Empty / Menu will come through Javascript--> */}
                    </nav>
                  </div>
                  <div className="search-box-outer search-toggler"></div>
                  <div className="btn-box">
                    <a href="index.html" className="theme-btn btn-two">
                      Get A Quote{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* <!-- main-header end -->

      <!-- Mobile Menu  --> */}
          <div className="mobile-menu">
            <div className="menu-backdrop"></div>
            <div className="close-btn">
              <i className="fas fa-times"></i>
            </div>

            <nav className="menu-box">
              <div className="nav-logo">
                <a href="index.html">
                  <img src="assets/images/logo-2.png" alt="" title="" />
                </a>
              </div>
              <div className="menu-outer">
                {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
              </div>
              <div className="contact-info">
                <h4>Contact Info</h4>
                <ul>
                  <li>Chicago 12, Melborne City, USA</li>
                  <li>
                    <a href="tel:+8801682648101">+88 01682648101</a>
                  </li>
                  <li>
                    <a href="mailto:info@example.com">info@example.com</a>
                  </li>
                </ul>
              </div>
              <div className="social-links">
                <ul className="clearfix">
                  <li>
                    <a href="index.html">
                      <span className="fab fa-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a href="index.html">
                      <span className="fab fa-facebook-square"></span>
                    </a>
                  </li>
                  <li>
                    <a href="index.html">
                      <span className="fab fa-pinterest-p"></span>
                    </a>
                  </li>
                  <li>
                    <a href="index.html">
                      <span className="fab fa-instagram"></span>
                    </a>
                  </li>
                  <li>
                    <a href="index.html">
                      <span className="fab fa-youtube"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          {/* <!-- End Mobile Menu -->

      <!-- banner-section --> */}
          <section className="banner-section p_relative centred">
            <div className="banner-carousel owl-theme owl-carousel owl-dots-none owl-nav-none">
              <div className="slide-item p_relative">
                <div
                  className="bg-layer"
                  style={{
                    backgroundImage: "url(assets/images/banner/mainBanner1.jpg)",
                  }}
                ></div>
                <div className="shape">
                  <div className="shape-1"></div>
                  <div className="shape-2"></div>
                  <div
                    className="shape-3"
                    style={{backgroundImage: "url(assets/images/shape/shape-1.png)"}}
                  ></div>
                  <div
                    className="shape-4"
                    style={{
                      backgroundImage: "url(assets/images/shape/shape-2.png)",
                    }}
                  ></div>
                  <div
                    className="shape-5"
                    style={{ backgroundImage: 'url(assets/images/shape/shape-3.png)' }}
                  ></div>
                </div>
                <div className="auto-container">
                  <div className="content-box p_relative d_block z_5">
                    <ul className="category-list mb_10 clearfix">
                      <li>
                        <a href="index.html">Handyman Services</a>
                      </li>
                    </ul>
                    <h2 className="p_relative d_block">
                      Alltasko - A Way to Hire
                      <br />
                      Local Services & Professionals
                    </h2>
                    <div className="btn-box">
                      <a href="index.html" className="theme-btn btn-one">
                        Request a Service
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide-item p_relative">
                <div
                  className="bg-layer"
                  style={{ backgroundImage: 'url(assets/images/banner/mainBanner2.jpg)' }}
                ></div>
                <div className="shape">
                  <div className="shape-1"></div>
                  <div className="shape-2"></div>
                  <div
                    className="shape-3"
                    style={{ backgroundImage: 'url(assets/images/shape/shape-1.png)' }}

                  ></div>
                  <div
                    className="shape-4"
                    style={{ backgroundImage: 'url(assets/images/shape/shape-2.png)' }}
                  ></div>
                  <div
                    className="shape-5"
                    style={{ backgroundImage: 'url(assets/images/shape/shape-3.png)' }}
                  ></div>
                </div>
                <div className="auto-container">
                  <div className="content-box p_relative d_block z_5">
                    <ul className="category-list mb_10 clearfix">
                      <li>
                        <a href="index.html">Handyman Services</a>
                      </li>
                    </ul>
                    <h2 className="p_relative d_block">
                      Alltasko - A Way to Hire
                      <br />
                      Local Services & Professionals
                    </h2>
                    <div className="btn-box">
                      <a href="index.html" className="theme-btn btn-one">
                        Request a Service
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slide-item p_relative">
                <div
                  className="bg-layer"
                  style={{ backgroundImage: 'url(assets/images/banner/mainBanner3.jpg)' }}

                ></div>
                <div className="shape">
                  <div className="shape-1"></div>
                  <div className="shape-2"></div>
                  <div
                    className="shape-3"
                    style={{ backgroundImage: 'url(assets/images/shape/shape-1.png)' }}
                  ></div>
                  <div
                    className="shape-4"
                    style={{ backgroundImage: 'url(assets/images/shape/shape-2.png)' }}
                  ></div>
                  <div
                    className="shape-5"
                    style={{ backgroundImage: 'url(assets/images/shape/shape-3.png)' }}

                  ></div>
                </div>
                <div className="auto-container">
                  <div className="content-box p_relative d_block z_5">
                    <ul className="category-list mb_10 clearfix">
                      <li>
                        <a href="index.html">Handyman Services</a>
                      </li>
                    </ul>
                    <h2 className="p_relative d_block">
                      Alltasko - A Way to Hire
                      <br />
                      Local Services & Professionals
                    </h2>
                    <div className="btn-box">
                      <a href="index.html" className="theme-btn btn-one">
                        Request a Service
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- banner-section end -->

      <!-- about-section --> */}
          <section className="about-section pt_170 pb_170">
            <div className="pattern-layer">
              <div
                className="pattern-1"
                style={{ backgroundImage: 'url(assets/images/shape/shape-4.png)' }}
              ></div>
              <div
                className="pattern-2 float-bob-y"
                style={{ backgroundImage: 'url(assets/images/shape/shape-5.png)' }}
              ></div>
            </div>
            <div className="auto-container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                  <div className="image_block_one">
                    <div className="image-box">
                      <figure className="image">
                        <img src="assets/images/resource/about.jpg" alt="" />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                  <div className="content_block_one">
                    {/* <!-- <div>
                                <h1 className="sec-title mb_60 centred" style="font-weight: bolder;">About Us</h1>
                            </div> --> */}
                    <div className="content-box ml_80">
                      <h2 style={{fontSize: "72px"}}>About Us</h2>
                      <div className="inner-box mb_50">
                        <div className="single-item"></div>
                        <div className="single-item">
                          <span className="count-text fw_medium">01</span>
                          <h2>
                            <a href="">Lorem.</a>
                          </h2>
                          <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Aspernatur enim blanditiis nulla ullam aliquid
                            temporibus.
                          </p>
                        </div>
                        <div className="single-item">
                          <span className="count-text fw_medium">02</span>
                          <h2>
                            <a href="">Lorem. </a>
                          </h2>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Et error tempore accusamus voluptate velit ex?
                          </p>
                        </div>
                      </div>
                      {/* <!-- <div className="lower-box">
                                    <div className="text-box">
                                        <span className="text">Our Location:</span>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
                                        <a href="">Get the direction</a>
                                    </div>
                                </div> --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- about-section end -->

      <!-- service-section --> */}
          <section className="service-section">
            <div
              className="pattern-layer"
              style={{ backgroundImage: 'url(assets/images/shape/shape-6.png)' }}

            ></div>
            <div className="shape">
              <div
                className="shape-1 rotate-me"
                style={{ backgroundImage: 'url(assets/images/shape/shape-7.png)' }}

              ></div>
              <div
                className="shape-2 float-bob-y"
                style={{ backgroundImage: 'url(assets/images/shape/shape-8.png)' }}

              ></div>
            </div>
            <div className="auto-container">
              <div className="upper-box mb_60">
                <div className="row clearfix">
                  <div className="col-lg-5 col-md-12 col-sm-12 title-column">
                    <div className="sec-title light">
                      <span className="sub-title pl_50 mb_35">
                        MORE ABOUT US
                      </span>
                      <h2>
                        We work day in, day out to meet our
                        <span>clients' demands.</span>
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 col-sm-12 text-column">
                    <div className="text-box mt_70">
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt.
                      </p>
                      <div className="btn-box">
                        <a href="index.html" className="theme-btn btn-one">
                          Request a Service
                        </a>
                        <a href="contact.html" className="contact-btn">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-content">
                <div className="four-item-carousel owl-carousel owl-theme owl-nav-none">
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">01</span>
                      <div className="icon-box">
                        <i className="icon-11"></i>
                      </div>
                      <h3>
                        <a href="service-details.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">02</span>
                      <div className="icon-box">
                        <i className="icon-7"></i>
                      </div>
                      <h3>
                        <a href="service-details-2.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details-2.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">03</span>
                      <div className="icon-box">
                        <i className="icon-8"></i>
                      </div>
                      <h3>
                        <a href="service-details-3.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details-3.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">04</span>
                      <div className="icon-box">
                        <i className="icon-9"></i>
                      </div>
                      <h3>
                        <a href="service-details-4.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details-4.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">01</span>
                      <div className="icon-box">
                        <i className="icon-11"></i>
                      </div>
                      <h3>
                        <a href="service-details.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">02</span>
                      <div className="icon-box">
                        <i className="icon-7"></i>
                      </div>
                      <h3>
                        <a href="service-details-2.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details-2.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">03</span>
                      <div className="icon-box">
                        <i className="icon-8"></i>
                      </div>
                      <h3>
                        <a href="service-details-3.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details-3.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">04</span>
                      <div className="icon-box">
                        <i className="icon-9"></i>
                      </div>
                      <h3>
                        <a href="service-details-4.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details-4.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">01</span>
                      <div className="icon-box">
                        <i className="icon-11"></i>
                      </div>
                      <h3>
                        <a href="service-details.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">02</span>
                      <div className="icon-box">
                        <i className="icon-7"></i>
                      </div>
                      <h3>
                        <a href="service-details-2.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details-2.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">03</span>
                      <div className="icon-box">
                        <i className="icon-8"></i>
                      </div>
                      <h3>
                        <a href="service-details-3.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details-3.html">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="service-block-one">
                    <div className="inner-box">
                      <span className="count-text">04</span>
                      <div className="icon-box">
                        <i className="icon-9"></i>
                      </div>
                      <h3>
                        <a href="service-details-4.html">Lorem.</a>
                      </h3>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magni quos aliquam ex iure culpa ab.
                      </p>
                      <ul className="list-item clearfix">
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                        <li>Lorem, ipsum.</li>
                      </ul>
                      <div className="btn-box">
                        <a href="service-details-4.html">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- service-section end -->

      <!-- project-section --> */}
          <section className="project-section">
            <div className="shape">
              <div
                className="shape-1 rotate-me"
                style={{ backgroundImage: 'url(assets/images/shape/shape-14.png)' }}

              ></div>
              <div
                className="shape-2 rotate-me"
                style={{ backgroundImage: 'url(assets/images/shape/shape-15.png)' }}

              ></div>
            </div>
            <div className="auto-container">
              <div className="sec-title mb_60 centred">
                <div className="icon-inner mb_10">
                  <div className="icon-box">
                    <i className="icon-5"></i>
                  </div>
                </div>
                <span className="sub-title mb_17">Complete Projects</span>
                <h2>
                  Our Recent Projects
                  <br />
                  Gallery
                </h2>
              </div>
              <div className="three-item-carousel owl-carousel owl-theme owl-nav-none">
                <div className="project-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src="assets/images/gallery/gallery1.jpg" alt="" />
                    </figure>
                    <div className="content-box">
                      <h3>
                        <a href="index.html">Completed Industrial Projects</a>
                      </h3>
                      <div className="link">
                        <a href="index.html">
                          <i className="icon-13"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src="assets/images/gallery/gallery2.jpg" alt="" />
                    </figure>
                    <div className="content-box">
                      <h3>
                        <a href="index.html">Handymen projects</a>
                      </h3>
                      <div className="link">
                        <a href="index.html">
                          <i className="icon-13"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src="assets/images/gallery/gallery3.jpg" alt="" />
                    </figure>
                    <div className="content-box">
                      <h3>
                        <a href="index.html">Completed Constraction Projects</a>
                      </h3>
                      <div className="link">
                        <a href="index.html">
                          <i className="icon-13"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src="assets/images/gallery/gallery1.jpg" alt="" />
                    </figure>
                    <div className="content-box">
                      <h3>
                        <a href="index.html">Completed Industrial Projects</a>
                      </h3>
                      <div className="link">
                        <a href="index.html">
                          <i className="icon-13"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src="assets/images/gallery/gallery2.jpg" alt="" />
                    </figure>
                    <div className="content-box">
                      <h3>
                        <a href="index.html">Handymen projects</a>
                      </h3>
                      <div className="link">
                        <a href="index.html">
                          <i className="icon-13"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src="assets/images/gallery/gallery3.jpg" alt="" />
                    </figure>
                    <div className="content-box">
                      <h3>
                        <a href="index.html">Handymen projects</a>
                      </h3>
                      <div className="link">
                        <a href="index.html">
                          <i className="icon-13"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src="assets/images/gallery/gallery1.jpg" alt="" />
                    </figure>
                    <div className="content-box">
                      <h3>
                        <a href="index.html">Handymen projects</a>
                      </h3>
                      <div className="link">
                        <a href="index.html">
                          <i className="icon-13"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src="assets/images/gallery/gallery2.jpg" alt="" />
                    </figure>
                    <div className="content-box">
                      <h3>
                        <a href="index.html">Handymen projects</a>
                      </h3>
                      <div className="link">
                        <a href="index.html">
                          <i className="icon-13"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src="assets/images/gallery/gallery3.jpg" alt="" />
                    </figure>
                    <div className="content-box">
                      <h3>
                        <a href="index.html">Handymen projects</a>
                      </h3>
                      <div className="link">
                        <a href="index.html">
                          <i className="icon-13"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- project-section end -->

      <!-- video-section --> */}
          <section className="video-section">
            <div
              className="bg-layer parallax-bg"
              data-parallax='{"y": 100}'
              style={{ backgroundImage: 'url(assets/images/banner/mainBanner1.jpg)' }}

            ></div>
            <div className="auto-container">
              <div className="row clearfix">
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                  <div className="content-box">
                    <div
                      className="shape"
                      style={{ backgroundImage: 'url(assets/images/banner/mainBanner1.jpg)', visibility: 'hidden' }}

                    ></div>
                    <div className="video-btn">
                      {/* <!-- <a href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s" className="lightbox-image"
                                    data-caption=""><i className="icon-14"></i>
                                    <div className="border-animation"></div>
                                    <div className="border-animation border-2"></div>
                                    <div className="border-animation border-3"></div>
                                </a> --> */}
                    </div>
                    <h2>We’re Building the Future and Restoring the Past</h2>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 inner-column">
                  <div className="content_block_four">
                    <div className="inner-box ml_100">
                      <h2>Request a Service</h2>
                      <div className="form-inner">
                        <form action="index.html" method="post">
                          <div className="form-group">
                            <input
                              type="text"
                              name="name"
                              placeholder="Your Name"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email Address"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label for="category">
                              Select Service Category:
                            </label>
                            <select
                             style={{ width: '200px' }}

                              id=""
                              name="category"
                              required
                            >
                              <option defaultValue="furniture">
                                Select a Handymen Service
                              </option>
                              <option defaultValue="furniture">
                                Furniture Assembly
                              </option>
                              <option defaultValue="handyman">Handyman</option>
                              <option defaultValue="plumbing">Plumbing</option>
                              <option defaultValue="electrical">
                                Electrical Work
                              </option>
                            </select>
                          </div>
                          <br />
                          <div className="form-group">
                            <input
                              type="text"
                              id="task"
                              name="task"
                              placeholder="E.g., Assemble a table and bed"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label for="quantity">Enter Quantity:</label>
                            <input
                              type="number"
                              id="quantity"
                              name="quantity"
                              min="1"
                              required
                              placeholder="Quantity"
                            />
                          </div>
                          <div className="form-group">
                            <label for="phone">Phone Number:</label>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone Number"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label for="city">City:</label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              required
                              placeholder="City"
                            />
                          </div>

                          <div className="form-group">
                            <label for="professional">
                              Select a Professional:
                            </label>
                            <select id="professional" name="professional">
                              <option defaultValue="default">
                                Best Available (All requests go to me)
                              </option>
                            </select>
                          </div>

                          <br />
                          <div className="form-group">
                            <label for="date">Pick a Date:</label>
                            <input type="date" id="date" name="date" />
                          </div>

                          <label for="photos">Upload Photos (if needed):</label>
                          <input
                            type="file"
                            id="photos"
                            name="photos"
                            accept="image/*"
                          />

                          <div className="form-group message-btn">
                            <button type="submit" className="theme-btn btn-two">
                              Get A Quote
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- video-section end -->

      <!-- testimonial-section --> */}
          <section className="testimonial-section">
            <div className="pattern-layer">
              <div
                className="pattern-1"
                style={{ backgroundImage: 'url(assets/images/shape/shape-18.png)' }}


              ></div>
              <div
                className="pattern-2"
                style={{ backgroundImage: 'url(assets/images/shape/shape-19.png)' }}


              ></div>
            </div>
            <div className="auto-container">
              <div className="sec-title mb_60 centred">
                <div className="icon-inner mb_10">
                  <div className="icon-box">
                    <i className="icon-5"></i>
                  </div>
                </div>
                <span className="sub-title mb_17">TESTIMONIAL</span>
                <h2>Client Feedback</h2>
              </div>
              <div className="two-item-carousel owl-carousel owl-theme owl-nav-none">
                <div className="testimonial-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <img src="assets/images/icons/icon-3.png" alt="" />
                    </div>
                    <div className="author-box">
                      <figure className="author-thumb">
                        <img
                          src="assets/images/testimonial/manager.jpg"
                          alt=""
                        />
                      </figure>
                      <h3>Theresa Webb</h3>
                      <span className="designation">Manager</span>
                      <ul className="rating clearfix">
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="text-box">
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <img src="assets/images/icons/icon-3.png" alt="" />
                    </div>
                    <div className="author-box">
                      <figure className="author-thumb">
                        <img src="assets/images/testimonial/ceo.jpg" alt="" />
                      </figure>
                      <h3>Haris Gulati</h3>
                      <span className="designation">CEO</span>
                      <ul className="rating clearfix">
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="text-box">
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <img src="assets/images/icons/icon-3.png" alt="" />
                    </div>
                    <div className="author-box">
                      <figure className="author-thumb">
                        <img
                          src="assets/images/testimonial/manager.jpg"
                          alt=""
                        />
                      </figure>
                      <h3>Theresa Webb</h3>
                      <span className="designation">Manager</span>
                      <ul className="rating clearfix">
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="text-box">
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <img src="assets/images/icons/icon-3.png" alt="" />
                    </div>
                    <div className="author-box">
                      <figure className="author-thumb">
                        <img src="assets/images/testimonial/ceo.jpg" alt="" />
                      </figure>
                      <h3>Haris Gulati</h3>
                      <span className="designation">CEO</span>
                      <ul className="rating clearfix">
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="text-box">
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <img src="assets/images/icons/icon-3.png" alt="" />
                    </div>
                    <div className="author-box">
                      <figure className="author-thumb">
                        <img
                          src="assets/images/testimonial/manager.jpg"
                          alt=""
                        />
                      </figure>
                      <h3>Theresa Webb</h3>
                      <span className="designation">Manager</span>
                      <ul className="rating clearfix">
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="text-box">
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="testimonial-block-one">
                  <div className="inner-box">
                    <div className="icon-box">
                      <img src="assets/images/icons/icon-3.png" alt="" />
                    </div>
                    <div className="author-box">
                      <figure className="author-thumb">
                        <img src="assets/images/testimonial/ceo.jpg" alt="" />
                      </figure>
                      <h3>Haris Gulati</h3>
                      <span className="designation">CEO</span>
                      <ul className="rating clearfix">
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                        <li>
                          <i className="icon-15"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="text-box">
                      <p>
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- testimonial-section end -->

      <!-- cta-section --> */}
          <section className="cta-section">
            <div
              className="bg-layer parallax-bg"
              data-parallax='{"y": 100}'
              style={{ backgroundImage: 'url(assets/images/background/footer.jpg)' }}
            ></div>
            <div className="auto-container">
              <div className="inner-box">
                <div className="text-box">
                  <div className="icon-box">
                    <i className="icon-12"></i>
                  </div>
                  <h2>Provide You Quality Work that Meets Your Expectation</h2>
                </div>
                <div className="btn-box">
                  <a href="index.html" className="theme-btn btn-two">
                    Get A Quote{" "}
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- cta-section end -->

      <!-- main-footer --> */}

          <footer className="main-footer">
            <div className="auto-container">
              <div className="widget-section">
                <div className="row clearfix">
                  <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                    <div className="footer-widget logo-widget">
                      <figure className="footer-logo">
                        <a href="index.html">
                          <img src="assets/images/logoMain.png" alt="" />
                        </a>
                      </figure>
                      <ul className="social-links mb_20 clearfix">
                        <li>
                          <a href="index.html">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li>
                          <a href="index.html">
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="index.html">
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="index.html">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                      </ul>
                      <div className="text">
                        <p>
                          On the other hand, we denounce with righteous
                          indignation and dislike.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                    <div className="footer-widget links-widget ml_60">
                      <div className="widget-title">
                        <h3>Explore Links</h3>
                      </div>
                      <div className="widget-content">
                        <ul className="links-list clearfix">
                          <li>
                            <a href="service.html">Our Services</a>
                          </li>
                          <li>
                            <a href="team.html">Meet Our Team</a>
                          </li>
                          <li>
                            <a href="index.html">Our Portfolio</a>
                          </li>
                          <li>
                            <a href="contact.html">Contact</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                    <div className="footer-widget links-widget">
                      <div className="widget-title">
                        <h3>Utility Pages</h3>
                      </div>
                      <div className="widget-content">
                        <ul className="links-list clearfix">
                          <li>
                            <a href="index.html">Style Guide</a>
                          </li>
                          <li>
                            <a href="index.html">Password Protected</a>
                          </li>
                          <li>
                            <a href="error.html">404 Not Found</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                    <div className="footer-widget contact-widget">
                      <div className="widget-title">
                        <h3>Contact</h3>
                      </div>
                      <div className="widget-content">
                        <ul className="info-list clearfix">
                          <li>
                            <div className="icon-box">
                              <i className="icon-21"></i>
                            </div>
                            <p>
                              <a href="mailto:contact@example.com">
                                contact@example.com
                              </a>
                            </p>
                          </li>
                          <li>
                            <div className="icon-box">
                              <i className="icon-22"></i>
                            </div>
                            <p>
                              <a href="tel:1234567890">(123) 456 - 7890</a>
                            </p>
                          </li>
                          <li>
                            <div className="icon-box">
                              <i className="icon-23"></i>
                            </div>
                            <p>
                              24 Broadcast Drive <br />
                              Charlotte NC 28202, USA
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-bottom centred">
                <div className="copyright">
                  <p>
                    Copyright &copy; 2025 All rights reserved. Designed &
                    Developed by Technovativelab
                  </p>
                </div>
              </div>
            </div>
          </footer>
          {/* <!-- main-footer end --> */}

          {/* <!--Scroll to top--> */}
          <div className="scroll-to-top">
            <div>
              <div className="scroll-top-inner">
                <div className="scroll-bar">
                  <div className="bar-inner"></div>
                </div>
                <div className="scroll-bar-text">Go To Top</div>
              </div>
            </div>
          </div>
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
