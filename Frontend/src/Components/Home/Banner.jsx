import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../../Consone/Data";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export default function Banner() {
  return (
    <div className="w-full relative">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        showDots
        dotListClass="custom-dot-list-style"
        itemClass="px-2"
        containerClass="carousel-container"
      >
        {bannerData.map((data, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={data.url}
              alt="banner"
              className="w-full h-[280px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80 group-hover:opacity-100 transition duration-500" />
            {/* Optional caption */}
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-xl md:text-2xl font-bold drop-shadow-lg">
                {data.title || "Special Offer"}
              </h2>
              <p className="text-sm md:text-base opacity-90">
                {data.subtitle || "Grab now before it's gone!"}
              </p>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom navigation arrows (optional) */}
      <style>
        {`
          .react-multi-carousel-dot-list {
            bottom: 15px !important;
          }
          .react-multi-carousel-dot button {
            border: 2px solid white !important;
            width: 12px;
            height: 12px;
            background: transparent;
            opacity: 0.7;
          }
          .react-multi-carousel-dot--active button {
            background: white !important;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}
