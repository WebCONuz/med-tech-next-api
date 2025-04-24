import type { Metadata } from "next";
import Hero from "@/app/[locale]/components/client/hero";
import Iframe from "@/app/[locale]/components/ui/iframe";
import ContactForm from "@/app/[locale]/components/client/contact-form";
import { GrLocation } from "react-icons/gr";
import { BsEnvelope } from "react-icons/bs";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo.Contact" });

  const baseUrl = `https://berlinmed-export.com/${locale}/contact`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: baseUrl,
    },
  };
}

export default async function Products() {
  const t = await getTranslations("ContactPage");

  return (
    <>
      <Hero title={t("title")} description={t("description")} />
      <section className="pt-10 sm:pt-12 md:pt-14 lg:pt-15 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="container flex flex-col md:flex-row md:gap-x-10">
          <div className="w-full md:w-1/2 mb-6 sm:mb-8 md:mb-0">
            <ContactForm />
          </div>
          <div className="w-full md:w-1/2">
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.3119420044563!2d69.28202807557582!3d41.345572998588544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b5577d651f7%3A0x53e8424358347ba7!2sToshkent%20teleminorasi%2C%20%D0%A2%D0%BEshkent%2C%20Toshkent%2C%20O%CA%BBzbekiston!5e0!3m2!1suz!2s!4v1743693336894!5m2!1suz!2s"
              title={t("iframe")}
            />
            <div className="flex items-center gap-x-4 mt-6 sm:mt-8">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-main-color flex items-center justify-center">
                <GrLocation className="text-xl" />
              </div>
              <p className="max-w-[200px] text-gray-600 leading-6">
                {t("address")}
              </p>
            </div>
            <div className="flex items-center gap-x-4 mt-3 sm:mt-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-main-color flex items-center justify-center">
                <LiaPhoneVolumeSolid className="text-xl" />
              </div>
              <p className="max-w-[200px] text-gray-600 leading-6">
                +998(90) 100-10-10
                <br />
                +998(90) 100-10-11
              </p>
            </div>
            <div className="flex items-center gap-x-4 mt-3 sm:mt-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-main-color flex items-center justify-center">
                <BsEnvelope className="text-xl" />
              </div>
              <p className="max-w-[300px] text-gray-600 leading-6">
                med-exapmle-1@gmail.com
                <br />
                med-exapmle-2@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
