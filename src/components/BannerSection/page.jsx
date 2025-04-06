'use client'
import { IoLocationSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import API from "@/redux/api";
import { useState } from "react";

export default function BannerSection() {
  const [query, setQuery] = useState(""); // Track the search query
  const [suggestions, setSuggestions] = useState([]); // Store the suggestions
  const [loading, setLoading] = useState(false);

  // Debounced function to handle the input change
  const handleQueryChange = async (event) => {
    const value = event.target.value; // Get the value from the input field
    setQuery(value); // Update query state with the input value

    if (!value) {
      setSuggestions([]); // Clear suggestions if query is empty
      return;
    }

    setLoading(true); // Set loading to true

    try {
      // Make the API call to fetch suggestions based on the query
      const response = await API.get("/api/category/search-subcategories", {
        params: { q: value },
      });

      // Update the suggestions state with the results from the API
      setSuggestions(response.data.results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]); // Clear suggestions on error
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  }; // Debounce time in milliseconds

  return (
    <>
      <section className="banner-section p_relative centred">
        <div className="banner-carousel">
          <div className="slide-item p_relative">
            <div className="auto-container">
              <div>
                <h2 className="p_relative d_block">
                  Alltasko - Trusted Pros For Every Task.
                </h2>
                <div className="search-container-parent">
                  <h3>Get free quotes within minutes</h3>
                  <div className="search-container">
                    <div className="mainBar">
                      <span style={{ marginLeft: "8px" }}>
                        <FaSearch size={25} />
                      </span>
                      <input
                        type="text"
                        placeholder="What Service are you looking for?"
                        value={query}
                        onChange={handleQueryChange} // Handle query change using debounce
                      />
                      {suggestions.length > 0 && query && (
                        <div className="suggestions-dropdown">
                          {loading && <p>Loading...</p>}
                          {!loading &&
                            suggestions.map((suggestion, index) => (
                              <div key={index} className="suggestion-item">
                                {suggestion}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="postalBar">
                      <span style={{ marginLeft: "2px" }}>
                        <IoLocationSharp size={25} />
                      </span>
                      <input type="text" placeholder="Postcode" />
                    </div>
                    <div className="searchBtn">Search</div>
                  </div>

                  {/* Show suggestions dropdown if suggestions exist */}


                  <div>
                    Popular: House Cleaning, Plumbing, Personal Trainers
                  </div>
                </div>
                <div className="popular-services"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
