import type { Metadata } from "next";
import Title from "@/app/[locale]/components/ui/title";
import OrderForm from "@/app/[locale]/components/client/order-form";
import { getTranslations } from "next-intl/server";

const url = process.env.API_URL;

export const metadata: Metadata = {
  title: "Orders",
  description: "Orders page",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderItem({ params }: Props) {
  const t = await getTranslations("SingleOrder");
  const { id } = await params;
  const res = await fetch(`${url}/api/product/${id}`, {
    headers: {
      lang: "1",
    },
  });
  if (!res.ok) {
    throw new Error("Some error");
  }
  const product = await res.json();
  console.log(product.data);

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
}
