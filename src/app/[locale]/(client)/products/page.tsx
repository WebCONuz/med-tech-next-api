import type { Metadata } from "next";
import Hero from "@/app/[locale]/components/client/hero";
import ProductsGrid from "@/app/[locale]/components/client/products-grid";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Products",
  description: "Products page",
};

export default async function Products({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const t = await getTranslations("ProductsPage");
  const { locale } = await params;

  return (
    <>
      <Hero title={t("title")} description={t("description")} />
      <ProductsGrid locale={locale} />
    </>
  );
}
