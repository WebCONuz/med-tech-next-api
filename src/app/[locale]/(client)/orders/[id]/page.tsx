import type { Metadata } from "next";
import Title from "@/app/[locale]/components/ui/title";
import OrderForm from "@/app/[locale]/components/client/order-form";
import { getTranslations } from "next-intl/server";
import { ILang } from "@/types/lang.types";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo.Order" });

  return {
    title: t("title", { id }),
    description: t("description"),
    robots: "noindex, nofollow", // Buyurtma sahifalari indekslanmasligi kerak
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
    },
  };
}

export default async function OrderItem({ params }: Props) {
  try {
    const t = await getTranslations("SingleOrder");
    const { id, locale } = await params;

    // get langs
    const res1 = await fetch(`https://api.berlinmed-export.com/api/language`);
    if (!res1.ok) throw new Error("Language error");
    const lang = await res1.json();
    const langObj = lang.data.find((item: ILang) => item.name === locale);

    // get products
    const res = await fetch(
      `https://api.berlinmed-export.com/api/product/${id}`,
      {
        headers: {
          lang: String(langObj?.id),
        },
      }
    );
    if (!res.ok) {
      throw new Error("Some error");
    }
    const product = await res.json();
    // console.log(product?.data);

    return (
      <>
        <section className="pt-10 sm:pt-12 md:pt-14 lg:pt-15 pb-12 sm:pb-16 lg:pb-20">
          <div className="container">
            <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5 mx-auto">
              <Title title={t("title")} />
              <p className="leading-6 mb-6 sm:mb-8">
                <b>{t("customer")}</b> <br />
                {t("msg")}
              </p>
              <OrderForm
                productName={product?.data?.name || "Product"}
                productId={+id}
              />
            </div>
          </div>
        </section>
      </>
    );
  } catch (err) {
    console.error(err);
    throw new Error("Error with orders api!");
  }
}
