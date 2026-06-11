"use client";
import { getSeedsStats } from "@/firebase/get-seed-stats";
import { SeedStat } from "@/types/garden-result";
import { useEffect, useState } from "react";
import SeedCard from "./seed-card";

export default function AllSeedsContainer() {
  const [isLoading, setIsLoading] = useState<true | false>(true);
  const [allSeeds, setAllSeeds] = useState<SeedStat[]>([]);
  useEffect(() => {
    async function getSeeds() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const seedStatsTemp = await getSeedsStats();
      if (seedStatsTemp && seedStatsTemp.length > 0) {
        setAllSeeds(seedStatsTemp);
      }
      setIsLoading(false);
    }
    getSeeds();
  }, []);

  return (
    <>
      {isLoading && "Loading"}
      {!isLoading && allSeeds && allSeeds.length > 0 && (
        <>
          <div>{allSeeds.length} seed types in the database</div>
          <div className="px-large grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:p-0">
            {allSeeds.map((seed) => (
              <SeedCard key={seed.seed} seed={seed.seed} stats={seed.stats} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
