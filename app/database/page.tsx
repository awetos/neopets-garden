"use client";
import FilterSelector from "@/components/all-table/filter-selector";
import MainTable from "@/components/all-table/main-table";

import { Suspense } from "react";

export default function () {
  return (
    <>
      <div>
        <div className="flex flex-col gap-5">
          <FilterSelector />
          <p>View the last 20 submissions</p>
          <Suspense fallback={<p>Loading table ...</p>}>
            <MainTable></MainTable>
          </Suspense>
        </div>
      </div>
    </>
  );
}
