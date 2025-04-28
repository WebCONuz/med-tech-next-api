import type { Metadata } from "next";
import Header from "@/app/[locale]/components/client/header";
import Footer from "@/app/[locale]/components/client/footer";

export const metadata: Metadata = {
  title: "Med Technique",
  description: "User Layout",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string; locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <div className="client-side">
      <Header locale={locale} />
      {children}
      <Footer />
    </div>
  );
}
