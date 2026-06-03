"use client";
import MainTable from "@/components/all-table/main-table";
import {
  SearchCacheContextProvider,
  useSearchContext,
} from "@/context/SearchCache";
import { Suspense } from "react";

export default function () {
  return (
    <>
      <div>
        <div>Filter By Seed</div>
        <div>Search for Item</div>
        <p>View the last 20 submissions</p>
        <div className="bg-amber-400">
          <Suspense fallback={<p>Loading table ...</p>}>
            <SearchCacheContextProvider>
              <MainTable></MainTable>
            </SearchCacheContextProvider>
          </Suspense>
        </div>
      </div>
    </>
  );
}
