"use client";

import { getSeedById } from "@/firebase/get-latest-submissions";
import { GardenResult } from "@/types/garden-result";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";
import Image from "next/image";
import { deleteSeedById } from "@/firebase/delete-submission";
import { Timestamp } from "firebase/firestore";

export default function ViewSeedPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [seedData, setSeedData] = useState<GardenResult>();
  const [seedPath, setSeedPath] = useState<string>();
  const [isRecent, setIsRecent] = useState<true | false>(false);
  const [deletionResult, setDeletionResult] = useState<string>("");

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
        //on the server there is another check too, but let's make it visible / not visible on client as well whether you can delete or not.
        const renderDeleteButton = checkDate(seedResult.createdAt);
        setIsRecent(renderDeleteButton);
      }
      setIsLoading(false);
    }

    getSeedData();
  }, [searchParams]);

  return (
    <div>
      Looking up info on... {id}
      {isLoading && "LoadingData"}
      {!isLoading && seedData && (
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1">
            <div className="flex w-full max-w-150 items-center justify-center">
              {seedPath && (
                <Image
                  src={seedPath}
                  alt={seedData.seed}
                  width={64}
                  height={64}
                />
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col bg-zinc-100 p-2">
            <h2 className="text-center text-2xl font-bold">Information</h2>
            <div> Seed ID: {seedData.id}</div>
            <div>Seed Type: {seedData.seed}</div>
            <div>
              Item: <span className="font-bold">{seedData.item}</span>
            </div>
            <div>
              Submitted On: {seedData.createdAt.toDate().toLocaleString()}
            </div>
          </div>
        </div>
      )}
      {!isLoading && seedData && isRecent && (
        <div className="item-center flex w-full justify-center hover:cursor-pointer">
          <div
            onClick={async () => {
              console.log("Deleting:", seedData.id);
              const res = await deleteSeedById(seedData.id);
              console.log("Delete result:", res);

              if (res.success) {
                // redirect
                setDeletionResult(res.message);
              }
            }}
            className="my-2 max-w-full bg-amber-400 p-2 px-20 hover:bg-amber-500"
          >
            Delete
          </div>
        </div>
      )}
      <div className="text-center">{deletionResult}</div>
      {!isLoading && !seedData && (
        <div>
          <p>No information found on this seed.</p>
        </div>
      )}
    </div>
  );
}
export function checkDate(createdAt: Timestamp): boolean {
  const createdTime = createdAt.toMillis();
  const now = Date.now();

  const fiveMinutesInMs = 5 * 60 * 1000;

  return now - createdTime <= fiveMinutesInMs;
}
