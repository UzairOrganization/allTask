import { IoMdArrowDropdown } from "react-icons/io";
import { CiLogin } from "react-icons/ci";

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
                {/* <div className="mobile-nav-toggler">
                  <i className="icon-bar"></i>
                  <i className="icon-bar"></i>
                  <i className="icon-bar"></i>
                </div> */}
                <nav className="main-menu navbar-expand-md navbar-light clearfix">
                  <ul className="navigation clearfix">
                    <li className="current dropdown" style={{ visibility: "hidden" }}>
                      <a href="index.html">Home</a>
                    </li>
                    <li className="dropdown" style={{ visibility: "hidden" }}>
                      <a href="index.html">Services</a>
                    </li>
                    <li className="dropdown" style={{ visibility: "hidden" }}>
                      <a href="index.html">Gallery</a>
                    </li>
                    <li className="dropdown" style={{ display: "flex", alignItems: "center", marginLeft: 180 }}>
                      <a href="index.html"> Explore </a>
                      <IoMdArrowDropdown size={20} color="black" />
                    </li>

                  </ul>

                </nav>
              </div>
              <div className="search-box-outer search-toggler">
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <a href="index.html" style={{ color: "black", fontSize: 20, fontWeight: "450" }}>LOGIN</a>
                  <CiLogin color="black" />
                </div>

              </div>
              <div className="btn-box" style={{ border: "1px solid blac" }}>
                <a href="index.html" className="theme-btn btn-two">
                  Join as Professional
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
              <div className="search-box-outer search-toggler">
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <a href="index.html" style={{ color: "black", fontSize: 19, fontWeight: "450" }}>LOGIN</a>
                  <CiLogin color="black" />
                </div>

              </div>
              <div className="btn-box">
                <a href="index.html" className="theme-btn btn-two">
                  Join as Professional{" "}
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
