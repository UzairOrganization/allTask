export default function VideoSection() {
  return<>
{/*<!-- video-section --> */
}<section className="video-section">
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
          <div className="inner-box ml_100" >
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
{/* <!-- video-section end -->*/
}  </>
}