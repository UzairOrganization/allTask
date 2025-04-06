'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from "swiper/modules"
// import { Navigation } from 'swiper';

export default function TestimonialSection() {
  return (
    <>
      {/* testimonial-section */}
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
            <h2>Client Feedback</h2>
          </div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={2} // Show 2 slides at once
            loop={true} // Infinite loop
            // Import necessary modules
            className="three-item-carousel"
            autoplay={{
              delay: 3000, // Auto play every 5 seconds
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1 }, // Mobile screens
              768: { slidesPerView: 2 }, // Tablets and above
            }}
          >
            <SwiperSlide>
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
            </SwiperSlide>

            <SwiperSlide>
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
            </SwiperSlide>
            <SwiperSlide>
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
            </SwiperSlide>
            <SwiperSlide>
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
            </SwiperSlide>

            {/* Add more SwiperSlide components for additional testimonials */}
          </Swiper>
        </div>
      </section>
      {/* testimonial-section end */}
    </>
  );
}
