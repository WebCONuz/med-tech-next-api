import type { Metadata } from "next";
import Hero from "@/app/[locale]/components/client/hero";
import ProductsGrid from "@/app/[locale]/components/client/products-grid";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Products",
  description: "Products page",
};

export default async function Products() {
  const t = await getTranslations("ProductsPage");

  return (
    <>
      <Hero title={t("title")} description={t("description")} />
      <ProductsGrid />
    </>
  );
}
