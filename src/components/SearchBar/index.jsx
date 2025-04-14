"use client";

import { API } from "@/lib/data-service";
import axios from "axios";
import { SearchIcon, XIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const debounceTimer = useRef(null);
    const suggestionsRef = useRef(null);
    const inputRef = useRef(null);

    const clearSearch = () => {
        setSearchQuery("");
        setSuggestions([]);
        setActiveSuggestionIndex(-1);

    };

    const handleSearch = async (selectedValue = searchQuery) => {
        try {
            const response = await axios.post(`${API}/api/category/find-hierarchy`, {
                subSubcategory: searchQuery
            });

            const data = response.data;
            if (data.success && data.category && data.subcategory && data.subSubcategory) {
                // Create URLSearchParams object
                const searchParams = new URLSearchParams();

                // Add the category hierarchy to URL parameters
                searchParams.set('category', data.category);
                searchParams.set('subcategory', data.subcategory);
                searchParams.set('subSubcategory', data.subSubcategory);

                // Get current path without existing query parameters
                const path = window.location.pathname;

                // Update the URL without reloading the page
                window.history.pushState({}, '', `${path}?${searchParams.toString()}`);

                // Alternative: If you want to reload the page with new URL
                // window.location.search = searchParams.toString();
            }

        } catch (e) {
            console.error(error.message);
        }
        setSuggestions([]);
        setIsFocused(false);
        setSearchQuery(selectedValue)
        if (inputRef.current) {
            inputRef.current.value = selectedValue
        }
    };

    // Fetch suggestions from backend
    const fetchSuggestions = async (query) => {
        if (!query.trim()) {
            setSuggestions([]);
            setActiveSuggestionIndex(-1);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `${API}/api/category/search-subcategories?q=${encodeURIComponent(query)}`
            );

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();

            if (data.results?.length > 0) {
                setSuggestions(data.results);
                setActiveSuggestionIndex(-1);
            } else {
                setSuggestions([]);
                setActiveSuggestionIndex(-1);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
            setActiveSuggestionIndex(-1);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!isFocused) return;

        // Arrow down
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (suggestions.length > 0) {
                const newIndex = activeSuggestionIndex < suggestions.length - 1
                    ? activeSuggestionIndex + 1
                    : activeSuggestionIndex;
                setActiveSuggestionIndex(newIndex);
                scrollSuggestionIntoView(newIndex);
            }
        }
        // Arrow up
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            const newIndex = activeSuggestionIndex > 0
                ? activeSuggestionIndex - 1
                : -1;
            setActiveSuggestionIndex(newIndex);
            if (newIndex >= 0) scrollSuggestionIntoView(newIndex);
        }
        // Enter
        else if (e.key === "Enter") {
            e.preventDefault();
            if (activeSuggestionIndex >= 0) {
                const selectedValue = suggestions[activeSuggestionIndex];
                setSearchQuery(selectedValue);
                handleSearch(selectedValue);
            } else {
                handleSearch();
            }
        }
        // Escape
        else if (e.key === "Escape") {
            e.preventDefault();
            setSuggestions([]);
            setIsFocused(false);
        }
    };

    // Scroll suggestion into view
    const scrollSuggestionIntoView = (index) => {
        if (suggestionsRef.current && index >= 0) {
            const suggestionElements = suggestionsRef.current.querySelectorAll('button');
            if (suggestionElements[index]) {
                suggestionElements[index].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }
        }
    };

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !inputRef.current?.contains(event.target) &&
                !suggestionsRef.current?.contains(event.target)
            ) {
                setIsFocused(false);
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounce the search input
    useEffect(() => {
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(searchQuery);
        }, 200);
        return () => clearTimeout(debounceTimer.current);
    }, [searchQuery]);

    return (
        <div className="p-4 flex flex-col justify-center items-center w-full ">
            <div className="w-full lg:w-[80%] lg:max-w-2xl relative">
                <div
                    ref={inputRef}
                    className={`flex items-center border rounded-full overflow-hidden transition-all duration-300 ${isFocused
                        ? "ring-2 ring-primary/50 border-primary shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                        }`}
                >
                    <div className="pl-4 pr-2">
                        <SearchIcon
                            className={`h-5 w-5 ${isFocused ? "text-primary" : "text-gray-400"}`}
                        />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for plumbing, cleaning and more.."
                        className="w-full text-sm py-3 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <XIcon className="h-4 w-4" />
                        </button>
                    )}
                    <button
                        onClick={() => handleSearch()}
                        className="px-4 lg:px-6 py-3 bg-[#008b6e] cursor-pointer text-white font-medium hover:bg-primary/90 transition-colors"
                    >
                        Search
                    </button>
                </div>

                {/* Search suggestions dropdown */}
                {isFocused && (searchQuery || isLoading) && (
                    <div
                        ref={suggestionsRef}
                        className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-h-[400px] overflow-y-auto"
                    >
                        <div className="py-2">
                            {isLoading ? (
                                <div className="px-4 py-2 text-sm text-gray-500">
                                    Loading suggestions...
                                </div>
                            ) : suggestions.length > 0 ? (
                                <>
                                    <p className="px-4 py-2 text-sm text-gray-500 sticky top-0 bg-white border-b">
                                        Service suggestions
                                    </p>
                                    {suggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            className={`w-full text-left px-4 py-2 transition-colors flex items-center ${index === activeSuggestionIndex
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-gray-50"
                                                }`}
                                            onClick={() => {
                                                setSearchQuery(suggestion);
                                                handleSearch(suggestion);
                                            }}
                                            onMouseEnter={() => setActiveSuggestionIndex(index)}
                                        >
                                            <SearchIcon className="h-4 w-4 mr-2 text-gray-400" />
                                            <span>{suggestion}</span>
                                        </button>
                                    ))}
                                </>
                            ) : (
                                <div className="px-4 py-2 text-sm text-gray-500">
                                    No services found for "{searchQuery}"
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;