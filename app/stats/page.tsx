import Heading from "@/components/about/heading";
import AllSeedsContainer from "@/components/all-stats/stats-page-components/all-seeds-container";
import MainStatsCard from "@/components/all-stats/stats-page-components/main-stats-card";
import { Suspense } from "react";

export default function Stats() {
  return (
    <>
      <Heading title="General Stats" />
      <Suspense>
        <MainStatsCard />
        <AllSeedsContainer />
      </Suspense>
    </>
  );
}
