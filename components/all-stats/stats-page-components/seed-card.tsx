"use client";
import { SeedStat } from "@/types/garden-result";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";
import Image from "next/image";

export default function SeedCard(currentSeed: SeedStat) {
  const [seedPath, setSeedPath] = useState<string>();
  useEffect(() => {
    function findSeedImage() {
      const foundSeed = seeds.find((seed) => seed.name === currentSeed.seed);
      setSeedPath(foundSeed?.path);
    }
    findSeedImage();
  }, []);

  return (
    <div className="bg-amber-100">
      <div className="border-b-2 border-b-amber-400 bg-amber-300 text-center">
        {currentSeed.seed}
      </div>
      <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2">
        <div className="order-2 grid grid-cols-1 bg-sky-400 md:order-1">
          {currentSeed.stats.fragments && `${currentSeed.stats.fragments}`}
          <div>
            <span className="font-semibold">Total Seeds:</span>
            {getTotalSeeds(currentSeed)}
          </div>
        </div>
        <div className="relative order-1 flex w-full items-center justify-center bg-white md:order-2 md:aspect-square">
          {seedPath ? (
            <Image
              src={seedPath}
              alt={currentSeed.seed}
              width={80}
              height={80}
            />
          ) : (
            `Can not find image for ${currentSeed.seed}`
          )}
        </div>
      </div>
    </div>
  );
}
/*export type SeedStat = {
  seed: string;
  stats: SeedList;
};

export type SeedList = {
  fragments?: number;
} & Partial<Record<(typeof categories)[number], number>>;
*/

//iterate through all the categories and add the sum of the number
function getTotalSeeds(currentSeed: SeedStat): number {
  const { fragments, ...categoryStats } = currentSeed.stats;

  return Object.values(categoryStats).reduce(
    (sum, value) => sum + (value ?? 0),
    0,
  );
  return 0;
}
