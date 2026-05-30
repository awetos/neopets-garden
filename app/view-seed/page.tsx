"use client";

import { getSeedById } from "@/firebase/get-latest-submissions";
import { GardenResult } from "@/types/garden-result";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";
import Image from "next/image";

export default function ViewSeedPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [seedData, setSeedData] = useState<GardenResult>();
  const [seedPath, setSeedPath] = useState<string>();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getSeedData() {
      if (!id) {
        setIsLoading(false);
      }
      const seedResult = await getSeedById(id ? id : "");
      if (seedResult) {
        setSeedData(seedResult as GardenResult);
        const foundSeed = seeds.find((seed) => seed.name === seedResult.seed);

        setSeedPath(foundSeed?.path);
      }
      setIsLoading(false);
    }

    getSeedData();
  }, [searchParams]);

  return (
    <div>
      Seed ID: {id}
      {isLoading && "LoadingData"}
      {!isLoading && seedData && (
        <div className="flex flex-row">
          <div>
            {seedPath && (
              <Image
                src={seedPath}
                alt={seedData.seed}
                width={64}
                height={64}
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">Information</h2>
              <div> Seed ID: {seedData.id}</div>
              <div>Seed Type: {seedData.seed}</div>
              <div>Item: {seedData.item}</div>
              <div>
                Submitted On: {seedData.createdAt.toDate().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !seedData && (
        <div>
          <p>No information found on this seed.</p>
        </div>
      )}
    </div>
  );
}
