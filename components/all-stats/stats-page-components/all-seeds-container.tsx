"use client";
import { useEffect, useState } from "react";

export default function AllSeedsContainer() {
  const [isLoading, setIsLoading] = useState<true | false>(true);
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
