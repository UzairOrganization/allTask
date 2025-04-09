"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // For navigation arrows (if needed)
import 'swiper/css/pagination'; // For pagination (if needed)
// import { Navigation, Pagination } from 'swiper';

export default function ProjectSection() {
  return (
    <>
      <section className="project-section">
        <div className="auto-container" >
          <div className="sec-title h2 mb_60 centred">
            <h2 style={{marginBottom:60}}>
              Our Recent Projects
              <br />
              Gallery
            </h2>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            spaceBetween={30} // Space between slides
            slidesPerView={3} // Display 3 items at once
            loop={true} // Infinite loop
            // Import necessary modules
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 }, 
              1020: { slidesPerView: 3 }, // Tablets and above
            }}
            className="three-item-carousel"
          >
            <SwiperSlide>
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
            </SwiperSlide>
            <SwiperSlide>
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
            </SwiperSlide>
            <SwiperSlide>
              <div className="project-block-one">
                <div className="inner-box">
                  <figure className="image-box">
                    <img src="assets/images/gallery/gallery3.jpg" alt="" />
                  </figure>
                  <div className="content-box">
                    <h3>
                      <a href="index.html">Completed Construction Projects</a>
                    </h3>
                    <div className="link">
                      <a href="index.html">
                        <i className="icon-13"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Add more slides as needed */}
            <SwiperSlide>
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
            </SwiperSlide>
            <SwiperSlide>
              <div className="project-block-one">
                <div className="inner-box">
                  <figure className="image-box">
                    <img src="assets/images/gallery/gallery2.jpg" alt="" />
                  </figure>
                  <div className="content-box">
                    <h3>
                      <a href="index.html">Handymen Projects</a>
                    </h3>
                    <div className="link">
                      <a href="index.html">
                        <i className="icon-13"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="project-block-one">
                <div className="inner-box">
                  <figure className="image-box">
                    <img src="assets/images/gallery/gallery3.jpg" alt="" />
                  </figure>
                  <div className="content-box">
                    <h3>
                      <a href="index.html">Completed Handymen Projects</a>
                    </h3>
                    <div className="link">
                      <a href="index.html">
                        <i className="icon-13"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
