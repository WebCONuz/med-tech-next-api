"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("dmin_uth");
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
