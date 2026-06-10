import MainStatsCard from "@/components/all-stats/stats-page-components/main-stats-card";
import { Suspense } from "react";

export default function Stats() {
  return (
    <>
      <div>
        Some stats about the gardening results will be here. Such as fragment
        drop rate and most commonly dropped items
      </div>
      <Suspense>
        <MainStatsCard />
      </Suspense>
    </>
  );
}
