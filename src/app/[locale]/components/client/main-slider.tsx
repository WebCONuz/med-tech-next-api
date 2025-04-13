"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderCard from "../ui/slider-card";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
}) as React.ComponentType<Settings & { children?: React.ReactNode }>;

interface SlideItem {
  id: number;
  image: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  items: SlideItem[];
}

const MainSlider: React.FC<CarouselProps> = ({ items }) => {
  const defaultSettings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...defaultSettings}>
        {items.map((item, index) => (
          <div
            key={index}
            className="pl-1 sm:pl-[2px] pr-1 sm:pr-4 lg:pr-6 py-1"
          >
            <SliderCard data={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MainSlider;
