'use client'
import { IoLocationSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";

import { useEffect, useRef, useState } from "react";
import { MdHomeRepairService } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { findCategoryHierarchy, getAvailableProviders } from "@/redux/slices/serviceProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/lib/data-service";

export default function BannerSection() {
  const router = useRouter()
  const [query, setQuery] = useState(""); // Track the search query
  const [suggestions, setSuggestions] = useState([]); // Store the suggestions
  const { loading: loadingRedux, availableProviders, categoryHierarchy } = useSelector((state) => state.provider)
  const [loading, setLoading] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionRefs = useRef([]);
  const [postalCode, setPostalCode] = useState()
  const [redirecting, setRedirecting] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      selectedIndex >= 0 &&
      suggestionRefs.current[selectedIndex]
    ) {
      suggestionRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);
  const handleQueryChange = async (event) => {
    const value = event.target.value;
    setQuery(value);
    setHasTyped(true);

    if (!value) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${API}/api/category/search-subcategories`, {
        params: { q: value },
      });

      setSuggestions(response.data.results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postalCode && query) {
      try {
        // Fetch the data by calling the getAvailableProviders and findCategoryHierarchy thunks
        const providersResponse = await dispatch(getAvailableProviders({ postalCode, category: query }));
        const categoryHierarchyResponse = await dispatch(findCategoryHierarchy(query));

        const availableProviders = providersResponse.payload;
        const categoryHierarchy = categoryHierarchyResponse.payload;



        // Store the fetched data in localStorage
        if (availableProviders && categoryHierarchy) {
          try {
            localStorage.setItem('availableProviders', JSON.stringify(availableProviders));
            localStorage.setItem('categoryHierarchy', JSON.stringify(categoryHierarchy));
          } catch (err) {
            console.error("Error saving data to localStorage", err);
          }
        }
        router.push("/service-request")
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    } else {
      console.error('Postal code or query missing');
    }
  };
  const storeCustomServiceInLocalStorage = () => {
    const category = {
      category: "CustomRequest",
      subcategory: "CustomRequest",
      subSubcategory: "CustomRequest"
    }
    const availableProviders = []
    try {
      localStorage.setItem('categoryHierarchy', JSON.stringify(category));
      localStorage.setItem('availableProviders', JSON.stringify(availableProviders));
    }
    catch (e) {
      console.error("Error saving data to localStorage", err);
    }
    window.location.href = "/service-request"
  }
  return (
    <>

      <section className="banner-section p_relative centred">
        <div className="banner-carousel">
          <div className="slide-item p_relative">
            <div className="auto-container">
              <div>
                <h2 className="p_relative h2 d_block">
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
                        onChange={handleQueryChange}
                        className="text-black"
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
                          } else if (e.key === "Enter") {
                            e.preventDefault();
                            if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                              setQuery(suggestions[selectedIndex]);
                              setSuggestions([]);
                              setHasTyped(false);
                              setSelectedIndex(-1);
                            }
                          }
                        }}

                      />

                      {query && (
                        <div className="suggestions-dropdown">
                          {loading ? (
                            <p>Loading...</p>
                          ) : suggestions.length > 0 ? (
                            suggestions.map((suggestion, index) => (
                              <div
                                ref={(el) => (suggestionRefs.current[index] = el)}
                                key={index}
                                className={`suggestion-item ${index === selectedIndex ? "bg-gray-200" : ""
                                  }`}
                                onClick={() => {
                                  setQuery(suggestion);
                                  setSuggestions([]);
                                  setHasTyped(false);
                                  setSelectedIndex(-1);
                                }}
                              >
                                {suggestion}
                              </div>
                            ))

                          ) : hasTyped ? (
                            <div
                              className="suggestion-item request-service"
                              onClick={() => {
                                storeCustomServiceInLocalStorage()
                              }}
                            >
                              <span className="flex gap-2 items-center mt-4 mb-4"><MdHomeRepairService color="gray" size={30} /> Request a Service</span>
                            </div>
                          ) : null}
                        </div>
                      )}


                    </div>
                    <div className="postalBar">
                      <span style={{ marginLeft: "2px" }}>
                        <IoLocationSharp size={25} />
                      </span>
                      <input type="text" placeholder="Postcode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="text-black" />
                    </div>
                    <div className="searchBtn" onClick={handleSubmit}>{loadingRedux ? "Searching..." : "Search"}</div>
                  </div>
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
