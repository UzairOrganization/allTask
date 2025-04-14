"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { findCategoryHierarchy, getAvailableProviders } from "@/redux/slices/serviceProvider";

const ServiceCard = ({ serviceName }) => {
  const serviceTitle = `${serviceName} Services`;
  const router = useRouter()
  const [zipCode, setZipCode] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!zipCode) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000);
      return; // Added return to prevent further execution
    }

    if (zipCode && serviceName) {
      setLoading(true)
      try {
        const providersResponse = await dispatch(getAvailableProviders({
          postalCode: zipCode,
          subSubCategory: serviceName
        }));
        const categoryHierarchyResponse = await dispatch(findCategoryHierarchy(serviceName));

        const availableProviders = providersResponse.payload;
        const categoryHierarchy = categoryHierarchyResponse.payload;

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
      } finally {
        setLoading(false)
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="group relative overflow-hidden border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer shadow-sm hover:shadow-md h-full flex flex-col">
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-800 text-left">{serviceName}</h3>
              </div>
            </div>
            <p className="text-sm text-left text-gray-500 mt-2 line-clamp-2">
              Premium {serviceName.toLowerCase()} services with expert professionals.
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{serviceName}</DialogTitle>
          <DialogDescription className="text-gray-600">
            Enter your zip code to get the nearest professional
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zipcode" className="text-right">
              Zip code
            </Label>
            <div className="col-span-3 space-y-1">
              <Input
                id="zipcode"
                type="text"
                value={zipCode}
                onChange={(e) => {
                  setZipCode(e.target.value);
                  setError(false); // Clear error when typing
                }}
                placeholder="e.g. 10001"
                className={`transition-colors ${error ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {error && (
                <div className="flex items-center gap-1 text-red-500 animate-fade-in">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Please enter a valid zip code</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#008b6e] hover:bg-[#007a5e] transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </>
            ) : (
              "Find Professionals"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SubCategoryList = ({ subcategories }) => {
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Check if URL has category parameters
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const subSubcategory = searchParams.get('subSubcategory');

    if (category && subcategory && subSubcategory) {
      setSelectedService({
        category,
        subcategory,
        subSubcategory
      });
    } else {
      setSelectedService(null);
    }
  }, [searchParams]);

  const handleServiceClick = (subcategory, subSubcategory) => {
    // Update URL with selected service
    const params = new URLSearchParams();
    params.set('category', selectedService?.category || '');
    params.set('subcategory', subcategory);
    params.set('subSubcategory', subSubcategory);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

    setSelectedService(prev => ({
      ...prev,
      subcategory,
      subSubcategory
    }));
  };

  const clearSelection = () => {
    // Clear URL parameters
    window.history.pushState({}, '', window.location.pathname);
    setSelectedService(null);
  };

  if (selectedService) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
          <div>
            <button
              onClick={clearSelection}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              ← Back to all services
            </button>
            <h2 className="text-xl font-semibold mt-2">{selectedService.subcategory}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ServiceCard
            serviceName={selectedService.subSubcategory}

          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {subcategories.map(({ subcategory, subSubcategories }, index) => (
        <div key={index} className="group">
          <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200 group-hover:border-primary/50 transition-colors">
            <h2 className="text-xl font-semibold">{subcategory}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subSubcategories.map((subSubcategory, i) => (
              <ServiceCard
                key={i}
                serviceName={subSubcategory}
                onClick={() => handleServiceClick(subcategory, subSubcategory)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubCategoryList;