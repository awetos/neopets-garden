import SubmissionForm from "@/components/submission-form/submission-form";
import LatestTable from "@/components/latest-table/latest-table";
import { Suspense } from "react";
import AllStatsPreview from "@/components/all-stats/stats-preview";

export default function Home() {
  return (
    <>
      <div>
        <div className="flex w-full flex-col">
          <p></p> Welcome! This is a site to record a crowd sourced database for
          results of the gardening on Neopets-Classic.
          <p>
            This project is purely for fun, for practicing backend stuff, and
            for curiousity.
          </p>
        </div>
        <div className="my-2 w-full bg-amber-200 pt-2 font-bold">
          <p className="pl-5">Submit your result</p>
          <div className="my-2 border-b-2 border-amber-500"></div>
          <SubmissionForm></SubmissionForm>
        </div>
        <Suspense fallback={<p>Loading latest data...</p>}>
          <AllStatsPreview />
        </Suspense>
        <div className="my-2 w-full bg-amber-200">
          <div className="text-center text-lg font-normal">
            <p>Latest Submissions</p>
          </div>

          <div className="mb-2 border-b-2 border-amber-500"></div>

          <Suspense fallback={<p>Loading latest submissions...</p>}>
            <LatestTable />
          </Suspense>
        </div>
        <div className="text-center text-xs text-zinc-500">
          Submissions within 5 minutes may be deleted if you've uploaded it by
          accident
        </div>
      </div>
    </>
  );
}
