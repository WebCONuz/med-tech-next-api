import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/app/[locale]/components/client/hero";
import Title from "@/app/[locale]/components/ui/title";
import MainSlider from "@/app/[locale]/components/client/main-slider";
import ProductCard from "@/app/[locale]/components/ui/product-card";
import { sertificateData } from "@/types/static.data";
import { getTranslations } from "next-intl/server";
import { ProductItem } from "@/types/product.types";
import Skeleton from "../components/ui/skeleton";

export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

const url = process.env.API_URL;
const getProducts = async () => {
  const res = await fetch(`${url}/api/product`, {
    cache: "no-store",
    headers: {
      lang: "1",
    },
  });
  if (!res.ok) {
    throw new Error("Some error");
  }
  const fullData = await res.json();
  return fullData.data;
};

export default async function About() {
  const t = await getTranslations("HomePage");
  let loading = true;
  const skeleton: number[] = [1, 2, 3, 4, 5];
  const products: ProductItem[] = await getProducts();
  loading = false;

  return (
    <main>
      <Hero title={t("title")} description={t("description")} />

      <section className="py-10 sm:py-12 lg:py-14 xl:py-16">
        <div className="container">
          <div className="flex flex-wrap lg:flex-nowrap lg:gap-x-10 xl:gap-x-14">
            <div className="hidden sm:block group w-full lg:w-1/2 mb-8 lg:mb-0 relative rounded-xl overflow-hidden">
              <img
                src="/about.webp"
                alt="about-image"
                className="w-full h-full object-cover"
              />
              <div className="w-full h-full absolute top-0 left-0 z-10 bg-[#3633783d] opacity-100 visible duration-200 group-hover:opacity-0 group-hover:invisible"></div>
            </div>
            <div className="w-full lg:w-1/2">
              <Title title={t("about_title")} />
              <p className="sm:leading-6 xl:leading-7 indent-6 sm:indent-8 xl:indent-10 mb-2 sm:mb-3 xl:mb-4">
                {t("about_1")}
              </p>
              <p className="sm:leading-6 xl:leading-7 indent-6 sm:indent-8 xl:indent-10 mb-2 sm:mb-3 xl:mb-4">
                {t("about_2")}
              </p>
              <p className="sm:leading-6 xl:leading-7 indent-6 sm:indent-8 xl:indent-10">
                {t("about_3")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-12 lg:pb-14 xl:pb-16">
        <div className="container">
          <Title title={t("featured_title")} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
            {!loading
              ? products.map(
                  (item) =>
                    item.id < 6 && <ProductCard key={item.id} data={item} />
                )
              : skeleton.map((item) => <Skeleton height="300px" key={item} />)}
          </div>
          <div className="w-full flex justify-center mt-8 md:mt-10">
            <Link
              href="/products"
              className="rounded font-medium transition-colors py-[6px] sm:py-2 px-3 sm:px-4 text-sm sm:text-base text-center bg-main-color hover:bg-main-bg text-white hover:text-black"
            >
              {t("btn_text")}
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20 xl:pb-24">
        <div className="container overflow-hidden">
          <Title title={t("sertification_title")} />
          <MainSlider items={sertificateData} />
        </div>
      </section>
    </main>
  );
}
