"use client";
import { seeds } from "@/types/seeds";
import { categories } from "@/types/garden-result";
import classes from "./filter-selector.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchContext } from "@/context/SearchCache";

import { SearchQuery } from "@/context/SearchCache";
export default function FilterSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentFilters, setCurrentFilters] = useState<SearchQuery>();

  const searchContext = useSearchContext();
  useEffect(() => {
    const currentParams: SearchQuery = {
      seeds: searchParams.getAll("seed"),
      category: searchParams.get("category") ?? "",
    };
    setCurrentFilters(currentParams);
    searchContext.updateCurrentSearchQuery(currentParams);
  }, []);
  console.log("currentFilters:", currentFilters);

  function toggleSeed(selectedSeed: string) {
    //do not redirect yet, just build the search params.
    //if the selected seed is in currentFilters.seeds, remove it; else, add it.
    if (currentFilters?.seeds && currentFilters?.seeds.includes(selectedSeed)) {
      const newSeeds = currentFilters.seeds.filter(
        (seed) => seed !== selectedSeed,
      );
      setCurrentFilters({
        seeds: newSeeds,
        category: currentFilters.category,
      });
    } else {
      setCurrentFilters({
        seeds: [...(currentFilters?.seeds ?? []), selectedSeed],
        category: currentFilters?.category ?? "",
      });
    }

    console.log(
      "toggle seed has ran, here are your current filters:\n",
      currentFilters,
    );
  }

  function toggleCategory(selectedCategory: string) {
    if (currentFilters?.category === selectedCategory) {
      setCurrentFilters({
        seeds: currentFilters.seeds,
        category: "",
      });
    } else {
      setCurrentFilters({
        seeds: currentFilters?.seeds ?? [],
        category: selectedCategory,
      });
    }
  }
  function runSearch() {
    if (currentFilters) searchContext.runSearch(currentFilters);
  }
  return (
    <div className="w-full bg-amber-200/50 p-2">
      <div className="pl-5 text-lg font-bold"> Filter By Seed</div>{" "}
      <div className="mx-5 mb-2 border-b-2 border-amber-500"></div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {seeds.map((seed) => {
          return (
            <div
              key={seed.name}
              className={`${classes.seedSelector} px-2`}
              data-selected={
                currentFilters?.seeds &&
                currentFilters?.seeds.includes(seed.name)
                  ? "on"
                  : "off"
              }
              onClick={() => {
                toggleSeed(seed.name);
              }}
            >
              {seed.name}
            </div>
          );
        })}
      </div>
      <div className="pl-5 text-lg font-bold"> Filter By Category</div>{" "}
      <div className="mx-5 mb-2 border-b-2 border-amber-500"></div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => {
          return (
            <div
              key={category}
              className={`${classes.seedSelector} px-2`}
              data-selected={
                currentFilters?.category === category ? "on" : "off"
              }
              onClick={() => {
                toggleCategory(category);
              }}
            >
              {category}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row items-center justify-center">
        <div
          className="m-2 w-sm max-w-full bg-amber-400 p-2 text-center"
          onClick={runSearch}
        >
          Apply Filter
        </div>
      </div>
    </div>
  );
}
