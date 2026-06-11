"use client";
import { SeedStat } from "@/types/garden-result";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";
import Image from "next/image";

export default function SeedCard(currentSeed: SeedStat) {
  const [seedPath, setSeedPath] = useState<string>();
  useEffect(() => {
    const foundSeed = seeds.find((seed) => seed.name === currentSeed.seed);
    setSeedPath(foundSeed?.path);
  }, []);

  return (
    <div className="bg-amber-100">
      <div className="border-b-2 border-b-amber-400 bg-amber-300 text-center">
        {currentSeed.seed}
      </div>
      <div className="grid grid-cols-2 overflow-hidden">
        <div className="bg-sky-400">
          {currentSeed.stats.fragments && `${currentSeed.stats.fragments}`}
        </div>
        <div className="bg-violet-400">
          {seedPath ? (
            <Image
              src={seedPath}
              alt={currentSeed.seed}
              width={64}
              height={64}
            />
          ) : (
            `Can not find image for ${currentSeed.seed}`
          )}
        </div>
      </div>
    </div>
  );
}
