import Link from "next/link";
import { ProductItem } from "@/types/product.types";

const ProductCard = ({ data }: { data: ProductItem }) => {
  return (
    <div className="relative shadow-lg md:shadow-xl rounded-lg overflow-hidden">
      <Link
        href={`/products/${data.id}`}
        className="flex items-center justify-center w-full h-[200px] sm:h-[220px] md:h-[300px] bg-main-bg"
      >
        <img
          src={"https://api.berlinmed-export.com/" + data.images}
          alt="product-item-img"
          className="w-[70%] md:w-3/4"
        />
      </Link>
      <div className="flex flex-col items-center pt-3 md:pt-4 pb-4 md:pb-5 px-2">
        {data.name && (
          <Link href={`/products/${data.id}`}>
            <h4 className="text-xs sm:text-base md:text-lg font-bold mb-[2px] sm:mb-1">
              {data.name}
            </h4>
          </Link>
        )}
        {data.description && (
          <p className="text-[10px] sm:text-base text-main-color w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
