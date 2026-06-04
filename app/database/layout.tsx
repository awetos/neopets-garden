"use client";
import { SearchCacheContextProvider } from "@/context/SearchCache";
export default function DatabaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SearchCacheContextProvider>
      <div>I'm the layout! {children}</div>
    </SearchCacheContextProvider>
  );
}
