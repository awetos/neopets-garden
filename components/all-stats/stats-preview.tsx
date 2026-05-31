"use client";
import { getLatestSubmissions } from "@/firebase/get-latest-submissions";
import { GardenResult } from "@/types/garden-result";
import { formatDistanceStrict } from "date-fns";
import { useEffect, useState } from "react";

const { formatDistance } = require("date-fns");
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AllStatsStructure, getLatestStats } from "@/firebase/get-stats";

//o\\

export default function AllStatsPreview() {
  const router = useRouter();

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

  return (
    <div>
      {!isLoading && latestStats && (
        <div className="text-center text-sm font-semibold">
          {latestStats.totalSeeds} total seeds submitted
        </div>
      )}
    </div>
  );
}
