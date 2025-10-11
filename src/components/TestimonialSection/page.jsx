"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function TestimonialSection() {
  const reviewerImage = "assets/images/testimonial/profile.jpg";

  const [testimonials, setTestimonials] = useState([
    {
      name: "Sophia Davis",
      rating: 5,
      text: "Really happy with AllTasko! I booked a carpenter through the app and he was polite, skilled, and finished the job fast. Prices are reasonable too. Just wish they had more service options in my area.",
    },
    {
      name: "Daniel Wilson",
      rating: 5,
      text: "AllTasko is a game-changer! I’ve tried many service apps before, but this one stands out for its smooth interface and trustworthy professionals. I found an AC technician in no time. Great work team!",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    text: "",
  });

  const handleAddReview = () => {
    if (!newReview.name || !newReview.text) return;
    setTestimonials([...testimonials, newReview]);
    setNewReview({ name: "", rating: 0, text: "" });
    setShowModal(false);
  };

  return (
    <>
      <section className="testimonial-section">
        <div className="pattern-layer">
          <div
            className="pattern-1"
            style={{ backgroundImage: "url(assets/images/shape/shape-18.png)" }}
          ></div>
          <div
            className="pattern-2"
            style={{ backgroundImage: "url(assets/images/shape/shape-19.png)" }}
          ></div>
        </div>

        <div className="auto-container" style={{ marginBottom: 40 }}>
          <div className="sec-title h2 mb_60 centred">
            <h2>Client Feedback</h2>
          </div>

          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "12px 28px",
                background: "#008b6e",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 16,
                transition: "0.3s",
                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
              }}
            >
              Add a Review
            </button>
          </div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <div
                  className="testimonial-block-one"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    className="inner-box"
                    style={{
                      textAlign: "left",
                      padding: "45px 35px",
                      minHeight: "350px",
                    }}
                  >
                    <div className="icon-box">
                      <img src="assets/images/icons/icon-3.png" alt="" />
                    </div>

                    <div
                      className="author-box"
                      style={{
                        marginLeft: "0px",
                        marginBottom: "14px",
                      }}
                    >
                      <div
                        className="author-content"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          marginLeft: "-130px",
                          justifyContent: "flex-start",
                          flexWrap: "wrap",
                        }}
                      >
                        <img
                          src={reviewerImage}
                          alt="Reviewer"
                          className="reviewer-image"
                          style={{
                            width: "95px",
                            height: "95px",
                            borderRadius: "12px",
                            objectFit: "cover",
                          }}
                        />
                        <div style={{ textAlign: "left" }}>
                          <h3
                            style={{
                              fontSize: "26px",
                              fontWeight: 700,
                              color: "#111",
                              marginBottom: 5,
                            }}
                          >
                            {t.name}
                          </h3>
                          <ul
                            className="rating clearfix"
                            style={{
                              marginTop: 6,
                              display: "flex",
                              gap: 3,
                              justifyContent: "flex-start",
                            }}
                          >
                            {[...Array(5)].map((_, i) => (
                              <li key={i}>
                                <i
                                  className="icon-15"
                                  style={{
                                    color: i < t.rating ? "#FFD700" : "#ddd",
                                  }}
                                ></i>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-box">
                      <p
                        style={{
                          fontSize: "16px",
                          color: "#666",
                          lineHeight: "1.7",
                        }}
                      >
                        {t.text}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3
              style={{
                marginBottom: 20,
                fontWeight: 600,
                fontSize: 20,
                color: "#111",
              }}
            >
              Add a Review
            </h3>

            <input
              type="text"
              placeholder="Full Name"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              style={inputStyle}
            />

            <div style={{ marginBottom: 15 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() =>
                    setNewReview({ ...newReview, rating: star })
                  }
                  style={{
                    fontSize: 26,
                    cursor: "pointer",
                    color: star <= newReview.rating ? "#FFD700" : "#ccc",
                    marginRight: 4,
                    transition: "0.2s",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="Write your review..."
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
              style={{ ...inputStyle, height: 100, resize: "none" }}
            />

            <div style={{ textAlign: "right", marginTop: 15 }}>
              <button
                onClick={() => setShowModal(false)}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
              <button onClick={handleAddReview} style={postButtonStyle}>
                Post Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ RESPONSIVE CSS ONLY — design unchanged */}
      <style jsx>{`
        @media (max-width: 992px) {
          .author-content {
            margin-left: 0 !important;
          }
        }

        @media (max-width: 768px) {
          .inner-box {
            padding: 35px 25px !important;
          }
          .reviewer-image {
            width: 80px !important;
            height: 80px !important;
          }
          .author-content {
            flex-direction: row !important;
            align-items: flex-start !important;
            margin-left: 0 !important;
          }
          .text-box p {
            font-size: 15px !important;
          }
        }

        @media (max-width: 576px) {
          .author-content {
            flex-direction: column !important;
            align-items: flex-start !important;
            margin-left: 0 !important;
          }
          .reviewer-image {
            margin-bottom: 10px !important;
          }
          .inner-box {
            padding: 25px 20px !important;
          }
        }
      `}</style>
    </>
  );
}

/* ===== Modal & Input Styles ===== */

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: 14,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const modalStyle = {
  background: "#fff",
  padding: 30,
  borderRadius: 14,
  width: "90%",
  maxWidth: 480,
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const cancelButtonStyle = {
  padding: "8px 16px",
  marginRight: 10,
  background: "#ccc",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 500,
};

const postButtonStyle = {
  padding: "8px 16px",
  background: "#008b6e",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 500,
};
