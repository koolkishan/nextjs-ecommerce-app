import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }: { rating: number }) => {
  const roundedRating = Math.round(rating * 2) / 2;

  const fullStarsCount = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStarsCount) {
      return <FaStar key={index} />;
    } else if (index === fullStarsCount && hasHalfStar) {
      return <FaStarHalfAlt key="half-star" />;
    } else {
      return <FaRegStar key={`empty-${index}`} />;
    }
  });

  return (
    <div className="flex">
      {stars.map((star, index) => (
        <span className="mx-1" key={index}>
          {star}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
