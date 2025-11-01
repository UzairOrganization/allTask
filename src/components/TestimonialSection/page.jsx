"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import { API } from "@/lib/data-service";
import { FaStar } from "react-icons/fa"; // ⭐ Import React Icon
import Testimonials from "./Testimonials";

export default function TestimonialSection() {
  const [loading, setLoading] = useState(false);

  const maleImage = "assets/images/testimonial/profile.jpg";
  const femaleImage = "assets/images/testimonial/female.png";

  const [testimonials, setTestimonials] = useState([
    {
      name: "Sophia Davis",
      rating: 5,
      gender: "female",
      text: "Really happy with AllTasko! I booked a carpenter through the app and he was polite, skilled, and finished the job fast. Prices are reasonable too. Just wish they had more service options in my area.",
    },
    {
      name: "Daniel Wilson",
      rating: 5,
      gender: "male",
      text: "AllTasko is a game-changer! I’ve tried many service apps before, but this one stands out for its smooth interface and trustworthy professionals. I found an AC technician in no time. Great work team!",
    },
  ]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API}/api/publicreviews`);
      if (res.data?.data) {
        setTestimonials([...res.data.data, ...testimonials]);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err.message);
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    gender: "",
    rating: 0,
    text: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newReview.name.trim()) newErrors.name = "Full name is required";
    if (!newReview.gender) newErrors.gender = "Please select a gender";
    if (!newReview.rating) newErrors.rating = "Please select a rating";
    if (!newReview.text.trim()) newErrors.text = "Review text cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddReview = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/publicreviews`, newReview);
      if (res.data?.data) {
        setTestimonials([res.data.data, ...testimonials]);
        setNewReview({ name: "", gender: "", rating: 0, text: "" });
        setErrors({});
        setShowModal(false);
      }
    } catch (err) {
      console.error("Failed to submit review:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
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
            <h2>Customer Feedback</h2>
          </div>
          <Testimonials/>
          {/* <div style={{ textAlign: "center", marginBottom: 40 }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "8px 22px",
                background: "#008b6e",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 16,
                transition: "0.3s",
                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                marginTop: 10,
              }}
            >
              {loading ? "Loading..." : "Add a Review"}
            </button>
          </div> */}

          {/* <Swiper
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
                  className="testimonial-block-one w-full"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    className="inner-box w-full"
                    style={{
                      textAlign: "left",
                      padding: "45px 35px",
                      minHeight: "350px",
                    }}
                  >
                    <div className="icon-box">
                      <img src="assets/images/icons/icon-3.png" alt="" />
                    </div>

                    <div className="author-box" style={{ marginBottom: "14px" }}>
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
                          src={t.gender === "female" ? femaleImage : maleImage}
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
                                <FaStar
                                  style={{
                                    color: i < t.rating ? "#FFD700" : "#ddd",
                                    fontSize: 18,
                                  }}
                                />
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
          </Swiper> */}
        </div>
      </section>

      {/* ✅ Modal */}
      {/* {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3 style={{ marginTop: 20, fontWeight: 600, fontSize: 20, color: "#111" }}>
              Add a Review
            </h3>

            <input
              type="text"
              placeholder="Full Name"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              style={inputStyle}
            />
            {errors.name && <p style={errorText}>{errors.name}</p>}

            <select
              value={newReview.gender}
              onChange={(e) => setNewReview({ ...newReview, gender: e.target.value })}
              style={inputStyle}
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            {errors.gender && <p style={errorText}>{errors.gender}</p>}

          
            <div style={{ marginBottom: 15,display:"flex" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  style={{
                    fontSize: 26,
                    cursor: "pointer",
                    color: star <= newReview.rating ? "#FFD700" : "#ccc",
                    marginRight: 4,
                    transition: "0.2s",
                  }}
                />
              ))}
            </div>
            {errors.rating && <p style={errorText}>{errors.rating}</p>}

            <textarea
              placeholder="Write your review..."
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              style={{ ...inputStyle, height: 100, resize: "none" }}
            />
            {errors.text && <p style={errorText}>{errors.text}</p>}

            <div style={{ textAlign: "right", marginTop: 15 }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  setErrors({});
                }}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
              <button onClick={handleAddReview} style={postButtonStyle}>
                {loading ? "Posting..." : "Post Review"}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

/* ===== Styles ===== */
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: 14,
};

const errorText = {
  color: "red",
  fontSize: 13,
  marginTop: "-6px",
  marginBottom: "8px",
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
