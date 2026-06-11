"use client";
import { SeedStat } from "@/types/garden-result";
import { useEffect, useState } from "react";

export default function AllSeedsContainer() {
  const [isLoading, setIsLoading] = useState<true | false>(true);
  const [allSeeds, setAllSeeds] = useState<SeedStat[]>([]);
  useEffect(() => {
    async function getSeeds() {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false);
    }
    getSeeds();
  }, []);

  return (
    <>
      {isLoading && "Loading"}
      {!isLoading && "Some seed info here"}
    </>
  );
}
