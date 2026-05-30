import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense fallback={<div>Loading Seed Details...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
