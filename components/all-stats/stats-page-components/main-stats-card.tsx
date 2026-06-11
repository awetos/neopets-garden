"use client";
import { useEffect, useState } from "react";

const { formatDistance } = require("date-fns");
import { useSearchParams } from "next/navigation";
import { AllStatsStructure, getLatestStats } from "@/firebase/get-stats";
import Loading from "@/components/loading";
import Heading from "@/components/about/heading";

//o\\

export default function AllStatsPreview() {
  const [latestStats, setLatestStats] = useState<AllStatsStructure | null>(
    null,
  );
  const [seedEntries, setSeedEntries] = useState<[string, number][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const refreshKey = searchParams.get("refresh");

  useEffect(() => {
    async function loadLatestStats() {
      await new Promise((resolve) => setTimeout(resolve, 2300));
      const stats_data = await getLatestStats();
      if (stats_data) {
        setLatestStats(stats_data);
        if (stats_data.seeds && Object.keys(stats_data.seeds).length > 0) {
          const seedEntriesTemp = Object.entries(stats_data.seeds ?? {});

          //compare the key in each item in the array
          //if b is greater than a, put b first.
          seedEntriesTemp.sort(([, a], [, b]) => b - a);
          setSeedEntries(seedEntriesTemp);
        }
      }
      setIsLoading(false);
    }

    loadLatestStats();
  }, [refreshKey]);
  // {latestStats.totalSeeds.toLocaleString()} total seeds submitted
  //  {latestStats.totalFragments.toLocaleString()} fragments received
  /* fragment drop rate:{" "}
              {(
                (latestStats.totalFragments / latestStats.totalSeeds) *
                100
              ).toFixed(2)}
              %
  */

  return (
    <div>
      {isLoading && <Loading text="Loading global stats" />}
      {!isLoading && latestStats && (
        <div className="flex flex-col overflow-hidden rounded-xl border-2 border-amber-300 bg-amber-100 px-5 py-2 text-center">
          <div className="w-full">
            <span className="font-semibold">Total seeds submitted: </span>
            {latestStats.totalSeeds.toLocaleString()}
          </div>
          <div className="w-full">
            <span className="font-semibold"> Total fragments received: </span>
            {latestStats.totalFragments.toLocaleString()}{" "}
          </div>
          <div className="w-full">
            <span className="font-semibold"> Fragment droprate: </span>
            {(
              (latestStats.totalFragments / latestStats.totalSeeds) *
              100
            ).toFixed(2)}
            %
          </div>
          {seedEntries && seedEntries.length > 0 && (
            <>
              <div className="w-full">
                <span className="font-semibold">Most popular seed:</span>{" "}
                {seedEntries[0][0]} ({seedEntries[0][1]})
              </div>
              <div className="my-2 border-b-2 border-amber-400 px-2"></div>
              <div className="w-full text-sm">
                {seedEntries.map(([seed, count], index) => (
                  <span key={seed}>
                    <span className="font-semibold">{seed}</span> ({count})
                    {index < seedEntries.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
//seedEntries: [string, number][]
function getSeedAmount(seedEntry: [string, number]) {
  return (
    <div key={seedEntry[0]} className="flex gap-1">
      <span className="font-semibold">{seedEntry[0]}</span>
      <span>({seedEntry[1]})</span>
    </div>
  );
}
