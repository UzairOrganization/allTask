import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/*<!-- main-footer --> */}
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

                  <div className="widget-content">
                    <ul className="links-list clearfix">
                      <li>
                        <Link href="/about">About</Link>
                      </li>
                      <li>
                        <Link href="/partner-with-us">Partner with us</Link>
                      </li>
                      {/* <li>
                        <a href="index.html">For Developers</a>
                      </li> */}
                      <li>
                        <Link href="/careers">Careers</Link>
                      </li>
                      <li>
                        <Link href="/press">Press</Link>
                      </li>
                      <li>
                        <Link href="blogs">Blogs</Link>
                      </li>
                    </ul>
                  </div>
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
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget logo-widget">
                  <div className="widget-title">
                    <h3>Customers</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list clearfix">

                      <li>
                        <Link href="how-to-use-alltasko">How to use Alltasko</Link>
                      </li>
                      <li>
                        <Link href="register-email">Sign up</Link>
                      </li>

                      <li>
                        <Link href="cost-estimate">Cost estimates</Link>
                      </li>
                      <li>
                        <Link href="home-resource-center">Home resource center</Link>
                      </li>
                      <li>
                        <Link href="user-requests">
                          Track My Leads
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget logo-widget">
                  <div className="widget-title">
                    <h3>Pros</h3>
                  </div>

                  <div className="widget-content">
                    <ul className="links-list clearfix">

                      <li>
                        <Link href="/alltasko-for-pros">Alltasko for pros</Link>
                      </li>
                      <li>
                        <Link href="register-professional">Sign up as a pro</Link>
                      </li>
                      <li>
                        <Link href="/forums">Community</Link>
                      </li>

                      <li>
                        <a href="iphone-app.html">iPhone app for pros</a>
                      </li>
                      <li>
                        <a href="android-app.html">Android app for pros</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                <div className="footer-widget logo-widget">
                  <div className="widget-title">
                    <h3>Support</h3>
                  </div>

                  <div className="widget-content">
                    <ul className="links-list clearfix">

                      <li>
                        <Link href="help-center">Help</Link>
                      </li>
                      <li>
                        <Link href="safety">Safety</Link>
                      </li>
                      <li>
                        <Link href="terms-of-use">Terms of Use</Link>
                      </li>
                      <li>
                        <Link href="privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link href="how-we-use-your-data">How We Use Your Data</Link>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom centred">
            <div className="copyright">
              <p style={{ color: "gray" }}>
                Copyright &copy; 2025 All rights reserved. Designed & Developed
                by Technovativelab
              </p>
            </div>
          </div>

        </div>
      </footer>
      {/* <!-- main-footer end --> */}{" "}
    </>
  );
}
