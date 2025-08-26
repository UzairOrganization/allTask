"use client";
import React, { useState } from "react";
import { FaTools, FaTruck, FaBrush } from "react-icons/fa";
import { LuDrill } from "react-icons/lu";
import { MdCleaningServices, MdHomeRepairService } from "react-icons/md";
import { FaTree } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
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

const navItems = [
  { id: 1, Icon: FaTools, label: "Furniture Assembly" },
  { id: 2, Icon: LuDrill, label: "TV Mounting" },
  { id: 3, Icon: FaTruck, label: "Moving Help" },
  { id: 4, Icon: MdCleaningServices, label: "Cleaning Services" },
  { id: 5, Icon: FaTree, label: "Outdoor Help" },
  { id: 6, Icon: MdHomeRepairService, label: "Home Repairs" },
  { id: 7, Icon: FaBrush, label: "Painting" },
];

const discoverData = {
  1: [
    { label: "Bed frame", img: "https://plus.unsplash.com/premium_photo-1661698951100-064e4ae229fd?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { label: "TV stand", img: "https://plus.unsplash.com/premium_photo-1661779632194-6cf32a9b5325?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHYlMjBzdGFuZHxlbnwwfHwwfHx8MA%3D%3D" },
    { label: "Bookshelf", img: "https://images.unsplash.com/photo-1593670755950-603e1d6184b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2slMjBzaGVsZnxlbnwwfHwwfHx8MA%3D%3D" },
  ],
  2: [
    { label: "32–45”", img: "https://plus.unsplash.com/premium_photo-1683141392308-aaa39d916686?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHR2JTIwbW91bnRpbmd8ZW58MHx8MHx8fDA%3D" },
    { label: "Wall mount bracket", img: "https://plus.unsplash.com/premium_photo-1744995489189-4189e36ac8c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFR2JTIwbW91bnQlMjBicmFja2V0fGVufDB8fDB8fHww" },
    { label: "Wire concealment", img: "https://images.unsplash.com/photo-1751846545116-838fe2e7e815?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2lyZSUyMGNvbmNlYWxtZW50fGVufDB8fDB8fHww" },
  ],
  3: [
    { label: "Heavy lifting", img: "https://plus.unsplash.com/premium_photo-1679168116865-7f9d1fafd328?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlmdGluZyUyMGdvb2RzfGVufDB8fDB8fHww" },
    { label: "Packing help", img: "https://plus.unsplash.com/premium_photo-1680300960757-376ffe4a18ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFja2luZyUyMGhlbHB8ZW58MHx8MHx8fDA%3D" },
    { label: "Load/unload truck", img: "https://images.unsplash.com/photo-1707407087163-7ab35bca9ffc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TG9hZCUyRnVubG9hZCUyMHRydWNrfGVufDB8fDB8fHww" },
  ],
  4: [
    { label: "General cleaning", img: "https://plus.unsplash.com/premium_photo-1683141112334-d7d404f6e716?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8R2VuZXJhbCUyMGNsZWFuaW5nfGVufDB8fDB8fHww" },
    { label: "Deep cleaning", img: "https://plus.unsplash.com/premium_photo-1664301014580-9d9941d1fb51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R2VuZXJhbCUyMGNsZWFuaW5nfGVufDB8fDB8fHww" },
    { label: "Move-out cleaning", img: "https://images.unsplash.com/photo-1631365696563-4990f4e9302c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TW92ZSUyMG91dCUyMGNsZWFuaW5nfGVufDB8fDB8fHww" },
  ],
  5: [
    { label: "Lawn mowing", img: "https://plus.unsplash.com/premium_photo-1747908374041-e54555009312?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TGF3biUyMG1vdmluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { label: "Hedge trimming", img: "https://plus.unsplash.com/premium_photo-1661324416773-aff119ed2e42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SGVkZ2UlMjB0cmltbWluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { label: "Leaf cleanup", img: "https://images.unsplash.com/photo-1710492873117-b790ba523fd4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhZiUyMGNsZWFuaW5nfGVufDB8fDB8fHww" },
  ],
  6: [
    { label: "Door repair", img: "https://plus.unsplash.com/premium_photo-1683134531395-1ebecbf3440c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RG9vciUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D" },
    { label: "Minor drywall patch", img: "https://images.unsplash.com/photo-1745092707630-c00ef0a006c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE1pbm9yJTIwZHJ5d2FsbCUyMHBhdGNoJTIwc2VydmljZXxlbnwwfHwwfHx8MA%3D%3D" },
    { label: "Faucet replacement", img: "https://images.unsplash.com/photo-1553265381-674034b34554?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RmF1Y2V0JTIwcmVwbGFjZW1lbnQlMjBzZXJ2aWNlfGVufDB8fDB8fHww" },
  ],
  7: [
    { label: "Interior wall painting", img: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SW50ZXJpb3IlMjB3YWxsJTIwcGFpbnRpbmclMjBzZXJ2aWNlfGVufDB8fDB8fHww" },
    { label: "Cabinet painting", img: "https://images.unsplash.com/photo-1606398016782-2f49b8c03e99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbiUyMENhYmluZXQlMjBwYWludGluZyUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D" },
    { label: "Fence painting", img: "https://images.unsplash.com/photo-1530328881134-8c525cc57036?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RmVuY2UlMjBwYWludGluZyUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D" },
  ],
};

const DiscoverNav = ({ items, selected, onSelect,setCategory }) => (
  <div className="discoverSection">
    {items.map(({ id, Icon, label }) => (
      <div
        key={id}
        className="item"
        onClick={() => {onSelect(id); setCategory(label)}}
        style={{
          backgroundColor: selected === id ? "#008B6E" : "transparent",
          color: selected === id ? "white" : "black",
          cursor: "pointer",
        }}
      >
        <Icon size={30} color={selected === id ? "white" : "black"} />
        <h3 style={{ color: selected === id ? "white" : "black" }} className="whitespace-nowrap text-[16px]">{label}</h3>
      </div>
    ))}
  </div>
);

const DiscoverDialog = ({ open, setOpen, itemLabel, onBook }) => {
  const [zipCode, setZipCode] = useState('');
  const [loading, setIsLoading] = useState(true);

  const handleContinue = async () => {
    setIsLoading(false);
    await onBook(zipCode, itemLabel, setIsLoading, setOpen);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

const DiscoverItems = ({ selected, onBook,category }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');

  return (
    <div className="discoverCartsSection">
      {discoverData[selected]?.map((item, idx) => (
        <Dialog key={idx} open={dialogOpen && currentLabel === item.label} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <div
              className="item cursor-pointer"
              onClick={() => {
                setCurrentLabel(item.label);
                setDialogOpen(true);
              }}
            >
              <div className="relative h-62 w-full">
                <Image
                  src={item.img}
                  alt={item.label}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h3 className="mt-2">{item.label}</h3>
            </div>
          </DialogTrigger>
          <DiscoverDialog
            open={dialogOpen && currentLabel === item.label}
            setOpen={setDialogOpen}
            itemLabel={category}
            onBook={onBook}
          />
        </Dialog>
      ))}
    </div>
  );
};

const Discover = () => {
  const [selected, setSelected] = useState(1);
  const [category, setCategory] = useState('Furniture Assembly');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBookService = async (zipCode, category, setIsLoading, setIsOpen) => {
    if (zipCode && category) {
      try {
        const providersResponse = await dispatch(getAvailableProviders({
          postalCode: zipCode,
          category: category
        }));
        const categoryHierarchyResponse = await dispatch(findCategoryHierarchy(category));

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
    <>
      <DiscoverNav items={navItems} setCategory={setCategory} selected={selected} onSelect={setSelected} />
      <DiscoverItems category={category} selected={selected} onBook={handleBookService} />
      <div className="pt-16 flex justify-center items-center">
        <div className="btn-box ">
          <Link href="/service" className="theme-btn btn-two">
            View All Services
          </Link>
        </div>
      </div>
    </>
  );
};

export default Discover;
