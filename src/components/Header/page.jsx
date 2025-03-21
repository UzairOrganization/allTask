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

          <div className="outer-box ">
            <div className="logo-box " >
              <figure className="logo">
                <a href="index.html">
                  <img src="assets/images/logoMain.png" alt="" />
                </a>
              </figure>
            </div>
            <div className="outer-inner-box" style={{ display: "flex", gap: "12px" }}>


              <div className="search-box-outer search-toggler " style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <li className="dropdown" style={{ display: "flex", alignItems: "center" }}>
                  <a href="index.html" style={{ color: "black", fontSize: 20, fontWeight: "450" }}> Explore </a>
                  <IoMdArrowDropdown size={20} color="black" />
                </li>

              </div>
              <div className="search-box-outer search-toggler " style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <a href="index.html" style={{ color: "black", fontSize: 20, fontWeight: "450" }}>LOGIN</a>
                  <CiLogin color="black" />
                </div>

              </div>
              <div className="btn-box " >
                <a href="index.html" className="theme-btn btn-two">
                  Join as Professional
                </a>
              </div>
              <div className="btn-box " >
                <a href="index.html" className="theme-btn btn-two" style={{width:"200px",textAlign:"center"}}>
                  Request a Service
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* <!--sticky Header--> */}
        <div className="sticky-header">

          <div className="outer-box ">
            <div className="logo-box " >
              <figure className="logo">
                <a href="index.html">
                  <img src="assets/images/logoMain.png" alt="" />
                </a>
              </figure>
            </div>
            <div className="outer-inner-box" style={{ display: "flex", gap: "12px" }}>


              <div className="search-box-outer search-toggler " style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <li className="dropdown" style={{ display: "flex", alignItems: "center" }}>
                  <a href="index.html" style={{ color: "black", fontSize: 20, fontWeight: "450" }}> Explore </a>
                  <IoMdArrowDropdown size={20} color="black" />
                </li>

              </div>
              <div className="search-box-outer search-toggler " style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <a href="index.html" style={{ color: "black", fontSize: 20, fontWeight: "450" }}>LOGIN</a>
                  <CiLogin color="black" />
                </div>

              </div>
              <div className="btn-box " >
                <a href="index.html" className="theme-btn btn-two">
                  Join as Professional
                </a>
              </div>
              <div className="btn-box " >
                <a href="index.html" className="theme-btn btn-two" style={{width:"200px",textAlign:"center"}}>
                  Request a Service
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
