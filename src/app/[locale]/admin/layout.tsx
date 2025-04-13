import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Med Technique",
  description: "Admin Layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
