"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { API } from "@/lib/data-service";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${API}/api/service-provider/get-latest-reviews`
        );
        setReviews(res.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading reviews...</p>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No reviews available yet.</p>
      </div>
    );
  }

  return (
  <section className="max-w-4xl mx-auto py-6 px-4">
    <div className="space-y-4 overflow-y-scroll scroll-smooth hide-scrollbar h-[600px]">
      {reviews.map((item, i) => (
        <div
          key={i}
          className={`border-b border-gray-200 px-4 py-3 rounded-lg ${
            i % 2 === 0 ? "bg-gray-100" : "bg-green-200"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {item.review.name}
              </h3>
              <p className="text-xs text-gray-500">
                {new Date(item.review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-700 font-medium">
              {item.providerName || item.review.professionalName}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-1">
            {[...Array(item.review.rating || 5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 text-yellow-500 fill-yellow-500"
              />
            ))}
          </div>

          {/* Review Text */}
          <p className="mt-1 text-gray-700 text-sm leading-snug">
            {item.review.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);

}
