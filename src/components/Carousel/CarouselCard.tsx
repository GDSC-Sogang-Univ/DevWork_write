import React from "react";
import type { CarouselItem } from "@/types/carousel";

interface CarouselCardProps extends CarouselItem {
  className?: string;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
  icon,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`relative w-full h-48 md:h-64 lg:h-80 ${className}`}>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-30 flex items-center">
        <div className="p-6 text-white w-full flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-2">
            {icon} {title}
          </h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
