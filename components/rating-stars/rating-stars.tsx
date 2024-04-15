"use client";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }: { rating: number }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const roundedRating = Math.round(rating * 2) / 2;

  const fullStarsCount = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStarsCount) {
      return <FaStar size={18} key={index} />;
    } else if (index === fullStarsCount && hasHalfStar) {
      return <FaStarHalfAlt size={18} key="half-star" />;
    } else {
      return <FaRegStar size={18} key={`empty-${index}`} />;
    }
  });

  return (
    <div className="flex">
      {stars.map((star, index) => (
        <span className="mx-[2px] " key={index}>
          {star}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
