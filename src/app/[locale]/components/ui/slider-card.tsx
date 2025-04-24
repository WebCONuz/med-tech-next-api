interface SlideItem {
  id: number;
  image: string;
  title?: string;
  description?: string;
}

const SliderCard = ({ data }: { data: SlideItem }) => {
  return (
    <div className="group flex flex-col w-full bg-main-bg p-2 relative shadow-md rounded-md">
      <img
        src={data.image}
        alt="slide-item-img"
        className="w-full h-[320px] sm:h-[280px] xl:h-[350px] object-cover rounded-md mb-4"
      />
      <h4 className="text-xl font-bold mb-2 text-center">{data.title}</h4>
    </div>
  );
};

export default SliderCard;
