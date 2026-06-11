"use client";
import FilterSelector from "@/components/all-table/filter-selector";
import MainTable from "@/components/all-table/main-table";

import { Suspense } from "react";

export default function () {
  return (
    <>
      <div>
        <div className="flex flex-col gap-5">
          <Suspense fallback={<p>Loading selected filters...</p>}>
            {" "}
            <FilterSelector />
          </Suspense>

          <Suspense fallback={<p>Loading table ...</p>}>
            <MainTable></MainTable>
          </Suspense>
          <div className="text-sm text-zinc-500">
            <p>
              Footnote: Results do not reflect the real proportion of the drop
              rate per category because users might not submit every garden
              result and only submit the interesting ones. Treat the results as
              a simply a reference for the potential item pool.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
