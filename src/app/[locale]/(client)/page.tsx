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
import { ILang } from "@/types/lang.types";
import EmptyData from "../components/ui/empty-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const supportedLocales = ["en", "ru", "ar"];
  const safeLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations({
    locale: safeLocale,
    namespace: "Seo.Home",
  });

  const baseUrl = "https://berlinmed-export.com";
  const imagePath = `${baseUrl}/berlinmed.jpg`;

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: "/",
      languages: {
        "x-default": "/",
        ru: "/",
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: imagePath,
          width: 1500,
          height: 1500,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [imagePath],
    },
  };
}

const getProducts = async (locale: string) => {
  try {
    const res1 = await fetch(`https://api.berlinmed-export.com/api/language`);
    const lang = await res1.json();
    const langObj = lang.data.find((item: ILang) => item.name === locale);

    const res = await fetch(`https://api.berlinmed-export.com/api/product`, {
      cache: "no-store",
      headers: {
        lang: String(langObj?.id || 1),
      },
    });
    if (!res.ok) {
      throw new Error("Some error");
    }
    const fullData = await res.json();
    return fullData.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function About({ params }: Props) {
  const t = await getTranslations("HomePage");
  const { locale } = await params;
  let loading = true;
  const skeleton: number[] = [1, 2, 3, 4, 5];
  const products: ProductItem[] = (await getProducts(locale)) || [];
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
          {products.length === 0 ? (
            <EmptyData title="Empty data!" />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                {!loading
                  ? products.map(
                      (item) =>
                        item.id < 6 && <ProductCard key={item.id} data={item} />
                    )
                  : skeleton.map((item) => (
                      <Skeleton height="300px" key={item} />
                    ))}
              </div>
              <div className="w-full flex justify-center mt-8 md:mt-10">
                <Link
                  href="/products"
                  className="rounded font-medium transition-colors py-[6px] sm:py-2 px-3 sm:px-4 text-sm sm:text-base text-center bg-main-color hover:bg-main-bg text-white hover:text-black"
                >
                  {t("btn_text")}
                </Link>
              </div>
            </>
          )}
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
