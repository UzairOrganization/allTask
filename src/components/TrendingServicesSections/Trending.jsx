import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
const trendingItems = [
  { id: 1, image: "/assets/images/discover/clean1.jpg", label: "Cleaning" },
  { id: 2, image: "/assets/images/discover/move1.jpg", label: "Moving" },
  {
    id: 3,
    image: "/assets/images/discover/clean2.jpg",
    label: "After Party Cleaning",
  },
  { id: 4, image: "/assets/images/discover/paint1.jpg", label: "Painting" },
  {
    id: 5,
    image: "/assets/images/discover/outdoor1.jpg",
    label: "Outdoor Help",
  },
  { id: 6, image: "/assets/images/discover/assemble2.jpg", label: "Assembly" },
];

const Trending = () => {
  return (
    <div className="trendingSection">
      <div className="head">
        <h2>Trending Services</h2>
      </div>
      <Marquee pauseOnHover={true}>
        <div className="marqueeContent">
          {trendingItems.map(({ id, image, label }) => (
            <div className="item" key={id}>
              <Image src={image} width={300} height={200} alt={label} />
              <h3>{label}</h3>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Trending;
