"use client";
import { SearchCacheContextProvider } from "@/context/SearchCache";
export default function DatabaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SearchCacheContextProvider>{children}</SearchCacheContextProvider>;
}
