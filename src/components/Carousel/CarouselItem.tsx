export interface CarouselItemType {
  id: number;
  icon: string; // 이모지 또는 아이콘 경로
  title: string;
  description: string;
}

function CarouselItem({ icon, title, description }: CarouselItemType) {
  return (
    <div className="embla__slide h-[120px] bg-gray-900 text-white py-3 flex flex-col gap-2 justify-center">
      <p className="font-bold flex gap-2 justify-center">
        <span>{icon}</span>
        {title}
      </p>
      <p className="text-xs">{description}</p>
    </div>
  );
}

export default CarouselItem;
