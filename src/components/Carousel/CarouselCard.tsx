import React from "react";

interface CarouselCardProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  className?: string;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
  imageUrl,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`relative w-full h-48 md:h-64 lg:h-80 ${className}`}>
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center">
        <div className="p-6 text-white w-full flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
