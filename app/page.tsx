import SubmissionForm from "@/components/submission-form/submission-form";
import LatestTable from "@/components/latest-table/latest-table";
import { Suspense } from "react";
import AllStatsPreview from "@/components/all-stats/stats-preview";
import Loading from "@/components/loading";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <div className="flex flex-col">
          Welcome! This site is for creating a crowd sourced database for
          results of the gardening on results of the gardening on{" "}
          <Link
            className="font-bold text-amber-600 hover:underline"
            href="https://neopetsclassic.com/"
          >
            Neopets-Classic
          </Link>{" "}
          - a fanmade rendition of the 2000-2004 era of Neopets. This project is
          purely for fun, for practicing backend stuff, and for curiosity.
          <p>
            <b className="text-sm">
              For the most accurate drop rates, please upload even when drops
              don't contain fragments or cool items.
              <br></br>
            </b>
            <b className="text-sm text-green-800">
              Seeds go in the gardening category.
            </b>
          </p>
          <p></p>
        </div>
        <div className="my-2 bg-amber-200 pt-2 font-bold">
          <p className="pl-5">Submit your result</p>
          <div className="mx-5 my-2 border-b-2 border-amber-500"></div>
          <SubmissionForm></SubmissionForm>
        </div>
        <Suspense fallback={<p>Loading latest data...</p>}>
          <AllStatsPreview />
        </Suspense>
        <div className="my-2 bg-amber-200">
          <div className="text-center text-lg font-normal">
            <p>Latest Submissions</p>
          </div>

          <div className="mx-5 mb-2 border-b-2 border-amber-500"></div>

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
