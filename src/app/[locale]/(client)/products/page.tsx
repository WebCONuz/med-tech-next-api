import type { Metadata } from "next";
import Hero from "@/app/[locale]/components/client/hero";
import ProductsGrid from "@/app/[locale]/components/client/products-grid";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo.Products" });

  const baseUrl = "https://berlinmed-export.com/products";
  const imagePath = `${baseUrl}/berlinmed.jpg`;

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("og_title"),
      description: t("og_description"),
      images: [imagePath],
    },
  };
}

export default async function Products({ params }: Props) {
  const t = await getTranslations("ProductsPage");
  const { locale } = await params;

  return (
    <>
      <Hero title={t("title")} description={t("description")} />
      <ProductsGrid locale={locale} />
    </>
  );
}
