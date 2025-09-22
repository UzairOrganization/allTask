'use client'

import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { findCategoryHierarchy, getAvailableProviders } from '@/redux/slices/serviceProvider';
import { toast } from 'sonner';
import { Button } from "../ui/button";

const trendingItems = [
  { id: 1, image: "https://res.cloudinary.com/dz8sirg5s/image/upload/v1750786842/asian-young-man-and-woman-cleaning-service-worker-2025-03-25-07-03-29-utc-min_sywldf.jpg", label: "Cleaning", name: 'Cleaning Services' },
  { id: 2, image: "https://res.cloudinary.com/dz8sirg5s/image/upload/v1750786876/two-smiling-couriers-unloading-cardboard-boxes-fro-2025-03-07-15-09-13-utc-min_rlmdz4.jpg", label: "Moving Help", name: 'Moving' },
  { id: 3, image: "https://res.cloudinary.com/dz8sirg5s/image/upload/v1750786842/man-repairs-hood-in-kitchen-replacement-filter-in-2025-03-13-13-06-21-utc-min_ik6sjx.jpg", label: "Cabinet Installation & Repair", name: 'Cabinet Installation & Repair' },
  { id: 4, image: "https://res.cloudinary.com/dz8sirg5s/image/upload/v1750786843/restoring-ceiling-2025-03-16-01-23-19-utc-min_jsj0if.jpg", label: "Interior Painting", name: 'Painting' },
  { id: 5, image: "https://res.cloudinary.com/dz8sirg5s/image/upload/v1750786856/adult-handyman-with-toolbox-checking-microwave-ove-2024-11-19-16-12-33-utc-min_cy3qbw.jpg", label: "Appliance Installation", name: 'Appliance Installation' },
  { id: 6, image: "https://res.cloudinary.com/dz8sirg5s/image/upload/v1750790298/furniture-delivery-service-concept-2025-02-09-22-58-24-utc_uoscyz.jpg", label: "TV Mounting", name: 'TV Mounting' },
  { id: 7, image: "https://res.cloudinary.com/dz8sirg5s/image/upload/v1750786872/pro-construction-site-contractor-worker-building-d-2025-03-14-11-38-18-utc-min_tumzcs.jpg", label: "Drywall Repair", name: 'Drywall Services' },
];

const TrendingItem = ({ item, onBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [loading, setIsLoading] = useState(true);

  const handleContinue = async () => {
    setIsLoading(false);
    await onBook(zipCode, item.name, setIsLoading, setIsOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="item cursor-pointer" onClick={() => setIsOpen(true)}>
          <Image src={item.image} width={300} height={200} alt={item.label} />
          <h3>{item.label}</h3>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Your Service</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zipcode" className="text-right">
              Zip Code
            </Label>
            <Input
              id="zipcode"
              type="text"
              placeholder="Enter your zip code"
              className="col-span-3"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              className="bg-green-700 cursor-pointer hover:bg-green-600"
              disabled={!zipCode.trim() || !loading}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TrendingList = ({ items, onBook }) => (
  <div className="marqueeContent">
    {items.map(item => (
      <TrendingItem key={item.id} item={item} onBook={onBook} />
    ))}
  </div>
);

const Trending = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBookService = async (zipCode, categoryName, setIsLoading, setIsOpen) => {
    if (zipCode && categoryName) {
      try {
        const providersResponse = await dispatch(getAvailableProviders({
          postalCode: zipCode,
          category: categoryName
        }));
        const categoryHierarchyResponse = await dispatch(findCategoryHierarchy(categoryName));

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
        setIsOpen(false);
        router.push("/service-request");
      } catch (err) {
        toast.error('Error fetching service professionals', {
          position: 'top-center',
          duration: 3000,
          style: { color: "red" }
        });
      } finally {
        setIsLoading(true);
      }
    } else {
      toast.error('Zip code is required', {
        position: 'top-center',
        duration: 3000,
        style: { color: "red" }
      });
      setIsLoading(true);
    }
  };

  return (
    <div className="trendingSection">
      <div className="head">
        <h2>Trending Services</h2>
      </div>
      <Marquee pauseOnHover={true}>
        <TrendingList items={trendingItems} onBook={handleBookService} />
      </Marquee>
    </div>
  );
};

export default Trending;
