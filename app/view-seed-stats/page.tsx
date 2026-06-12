"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";
import Image from "next/image";
import Loading from "@/components/loading";
import Heading from "@/components/about/heading";

export default function ViewSeedPage() {
  const searchParams = useSearchParams();
  const seedCategory = searchParams.get("seed_category");
  const [seedPath, setSeedPath] = useState<string>();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getSeedData() {
      if (!seedCategory) {
        setIsLoading(false);
      }

      setIsLoading(false);
    }

    getSeedData();
  }, [searchParams]);

  return (
    <div>
      <Heading title="Viewing Details on Seed" />
      {!isLoading && <p>{seedCategory}</p>}
    </div>
  );
}
