import Link from "next/link";
import { ProductItem } from "@/types/product.types";
import { useTranslations } from "next-intl";

const RowProductCard = ({ data }: { data: ProductItem }) => {
  const t = useTranslations("ProductsPage");

  return (
    <div className="flex w-full border border-gray-300 shadow-md rounded-md overflow-hidden">
      <Link
        href={`/products/${data.id}`}
        className="flex items-center justify-center bg-main-bg w-2/5 py-5"
      >
        <img
          src={"https://api.berlinmed-export.com/" + data.images}
          alt="product-item-img"
          className="w-4/5 sm:w-1/2"
        />
      </Link>
      <div className="w-3/5 p-3 sm:p-6">
        {data.name && (
          <Link href={`/products/${data.id}`}>
            <h4 className="text-lg sm:text-xl font-bold">{data.name}</h4>
          </Link>
        )}
        {data.description && (
          <p className="text-gray-500 sm:leading-7 mb-4">{data.description}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-y-[6px] sm:gap-y-0 sm:gap-x-2">
          <Link
            href={`/products/${data.id}`}
            className="rounded font-medium transition-colors text-sm sm:text-base py-[6px] sm:py-2 sm:px-4 text-center bg-main-color hover:bg-main-bg text-white hover:text-black"
          >
            {t("btn1")}
          </Link>
          <Link
            href={`/orders/${data.id}`}
            className="rounded font-medium transition-colors text-sm sm:text-base py-[6px] sm:py-2 sm:px-4 text-center bg-main-color hover:bg-main-bg text-white hover:text-black"
          >
            {t("btn2")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RowProductCard;
