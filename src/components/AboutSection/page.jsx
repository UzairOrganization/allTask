export default function AboutSection() {
  return (
   /*<!-- about-section --> */
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

/* <!-- about-section end -->*/
  );
}
