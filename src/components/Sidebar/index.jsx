"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar({ categories, selectedCategory }) {
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Get category from URL params
  const urlCategory = searchParams.get('category');
  const activeCategory = urlCategory || selectedCategory;

  return (
    <>
      {/* Mobile Menu Button - Shows on screens < 1024px */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-3 bg-[#008b6e] text-white rounded-full shadow-lg lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar Container */}
      <div className={`
         h-full flex flex-col border-r bg-white dark:bg-gray-900
        fixed lg:static inset-y-0 left-0 z-40 transform
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Sidebar Header */}
        <div className="p-6 pb-4 border-b">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Services</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Browse professional services
          </p>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto space-y-1 px-2">
          {categories.map(({ _id, category }) => {
            const isActive = activeCategory === category;

            return (
              <Link
                key={_id}
                href={{
                  pathname: '/all-categories',
                  query: { selectedCategory1: category }
                }}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center justify-between
                  px-3 py-2 lg:px-4 lg:py-3 rounded-lg
                  transition-all duration-200 text-sm lg:text-base
                  ${isActive
                    ? "bg-primary/10 text-primary font-medium border border-primary/20"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  }
                  border
                `}
              >
                <span className="truncate">{category}</span>
                {isActive && <ChevronRight className="h-4 w-4 text-primary" />}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t text-xs text-gray-500 dark:text-gray-400">
          {categories.length} services available
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}