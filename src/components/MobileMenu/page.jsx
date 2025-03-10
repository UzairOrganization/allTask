export default function MobileMenu(){
  return(
    <>
{    /*!-- Mobile Menu  --> */
}    <div className="mobile-menu">
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
    {/* <!-- End Mobile Menu -->*/}
    </>
  )
}