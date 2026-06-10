"use client";
import { useEffect, useState } from "react";

const { formatDistance } = require("date-fns");
import { useSearchParams } from "next/navigation";
import { AllStatsStructure, getLatestStats } from "@/firebase/get-stats";

//o\\

export default function AllStatsPreview() {
  const [latestStats, setLatestStats] = useState<AllStatsStructure | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const refreshKey = searchParams.get("refresh");

  useEffect(() => {
    async function loadLatestStats() {
      const stats_data = await getLatestStats();
      if (stats_data) {
        setLatestStats(stats_data);
      }
      setIsLoading(false);
    }

    loadLatestStats();
  }, [refreshKey]);
  //

  return (
    <div>
      {!isLoading && latestStats && (
        <div className="flex flex-row flex-wrap justify-evenly text-center text-sm font-semibold">
          <div>
            <p>
              {latestStats.totalSeeds.toLocaleString()} total seeds submitted
            </p>
          </div>
          <div>
            <p>---</p>
          </div>
          <div>
            <p>
              {latestStats.totalFragments.toLocaleString()} fragments received
            </p>
          </div>
          <div>
            <p>---</p>
          </div>
          <div>
            <p>
              fragment drop rate:{" "}
              {(
                (latestStats.totalFragments / latestStats.totalSeeds) *
                100
              ).toFixed(2)}
              %
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
