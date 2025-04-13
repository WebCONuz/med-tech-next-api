import Sidebar from "@/app/[locale]/components/admin/sidebar";
import Header from "@/app/[locale]/components/admin/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="h-screen w-1/5">
        <Sidebar />
      </div>
      <div className="h-screen w-4/5 overflow-y-auto">
        <Header />
        <main className="px-4 py-4 pb-8">{children}</main>
      </div>
    </div>
  );
}
