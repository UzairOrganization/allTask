export default function Header() {
  return (
    <>
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
                  {/* <div
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
                  </div> */}
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
      {/* <!-- main-header end -->*/}{" "}
    </>
  );
}
