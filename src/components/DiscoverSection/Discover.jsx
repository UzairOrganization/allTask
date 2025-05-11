"use client";
import React, { useState } from "react";
import { FaTools, FaTruck, FaBrush, FaFire } from "react-icons/fa";
import { LuDrill } from "react-icons/lu";
import { MdCleaningServices, MdHomeRepairService } from "react-icons/md";
import { FaTree } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
const items = [
  { id: 1, Icon: FaTools, label: "Assembly" },
  { id: 2, Icon: LuDrill, label: "Mounting" },
  { id: 3, Icon: FaTruck, label: "Moving" },
  { id: 4, Icon: MdCleaningServices, label: "Cleaning" },
  { id: 5, Icon: FaTree, label: "Outdoor Help" },
  { id: 6, Icon: MdHomeRepairService, label: "Home Repairs" },
  { id: 7, Icon: FaBrush, label: "Painting" },
];

const Discover = () => {
  const [selected, setSelected] = useState(1);

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <>
      <div className="discoverSection">
        {items.map(({ id, Icon, label }) => (
          <div
            key={id}
            className="item"
            onClick={() => handleSelect(id)}
            style={{
              backgroundColor: selected === id ? "#008B6E" : "transparent",
              color: selected === id ? "white" : "black",
              cursor: "pointer",
              // boxShadow:
              //   selected == id
              //     ? "0 0 5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.3)"
              //     : "none",

            }}
          >
            <Icon size={30} color={selected === id ? "white" : "black"} />
            <h3 style={{ color: selected == id ? "white" : "black" }}>
              {label}
            </h3>
          </div>
        ))}
      </div>
      <div className="discoverCartsSection">
        {selected == 1 && (
          <>
            <div className="item">
              <Image
                src={"/assets/images/discover/assemble1.webp"}
                width={300}
                height={200}
              />
              <h3>Furniture Assemble</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/assemble2.jpg"}
                width={300}
                height={200}
              />
              <h3>Ikea Assemble</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/assemble3.jpg"}
                width={300}
                height={200}
              />
              <h3>Crib Assemble</h3>
            </div>
          </>
        )}
        {selected == 2 && (
          <>
            <div className="item">
              <Image
                src={"/assets/images/discover/mount1.jpg"}
                width={300}
                height={200}
              />
              <h3>Hang Art, Mirror & Decor</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/mount2.jpg"}
                width={300}
                height={200}
              />
              <h3>Install Blinds & Window</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/mount3.jpg"}
                width={300}
                height={200}
              />
              <h3>Mount & Anchor Furniture</h3>
            </div>
          </>
        )}

        {selected == 3 && (
          <>
            <div className="item">
              <Image
                src={"/assets/images/discover/move1.jpg"}
                width={300}
                height={200}
              />
              <h3>Help Moving</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/move2.jpg"}
                width={300}
                height={200}
              />
              <h3>Truck-Assisted Help Moving</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/move3.jpg"}
                width={300}
                height={200}
              />
              <h3>Trash & Furniture Removal</h3>
            </div>
          </>
        )}

        {selected == 4 && (
          <>
            <div className="item">
              <Image
                src={"/assets/images/discover/clean1.jpg"}
                width={300}
                height={200}
              />
              <h3>Cleaning</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/clean2.jpg"}
                width={300}
                height={200}
              />
              <h3>Party Clean Up</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/clean3.jpg"}
                width={300}
                height={200}
              />
              <h3>Apartment Cleaning</h3>
            </div>
          </>
        )}
        {selected == 5 && (
          <>
            <div className="item">
              <Image
                src={"/assets/images/discover/outdoor1.jpg"}
                width={300}
                height={200}
              />
              <h3>Yard Work</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/outdoor2.jpg"}
                width={300}
                height={200}
              />
              <h3>Lawn Care</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/outdoor3.jpg"}
                width={300}
                height={200}
              />
              <h3>Snow Removal</h3>
            </div>
          </>
        )}
        {selected == 6 && (
          <>
            <div className="item">
              <Image
                src={"/assets/images/discover/home1.jpg"}
                width={300}
                height={200}
              />
              <h3>Wall Repair</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/home2.jpg"}
                width={300}
                height={200}
              />
              <h3>Sealing Cauliking</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/home3.jpg"}
                width={300}
                height={200}
              />
              <h3>Electric Help</h3>
            </div>
          </>
        )}
        {selected == 7 && (
          <>
            <div className="item">
              <Image
                src={"/assets/images/discover/paint1.jpg"}
                width={300}
                height={200}
              />
              <h3>Indoor Painting</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/paint2.jpg"}
                width={300}
                height={200}
              />
              <h3>Wallpapering</h3>
            </div>
            <div className="item">
              <Image
                src={"/assets/images/discover/paint3.jpg"}
                width={300}
                height={200}
              />
              <h3>Outdoor Painting</h3>
            </div>
          </>
        )}
      </div>
      <div className="pt-16 flex justify-center items-center">
        <div className="btn-box ">
          <Link href="/all-categories" className="theme-btn btn-two">
            View All Services
          </Link>
        </div>
      </div>
    </>
  );
};

export default Discover;
