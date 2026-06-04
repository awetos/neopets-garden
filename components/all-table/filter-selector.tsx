"use client";
import { seeds } from "@/types/seeds";
import { categories } from "@/types/garden-result";
import classes from "./filter-selector.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type SearchQuery = {
  seeds: string[];
  category: string;
};
export default function FilterSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentFilters, setCurrentFilters] = useState<SearchQuery>();

  useEffect(() => {
    function getCurrentSearchParams() {
      const currentParams: SearchQuery = {
        seeds: searchParams.getAll("seed"),
        category: searchParams.get("category") ?? "",
      };
      setCurrentFilters(currentParams);
      console.log("Current Params: ", currentParams);
    }
    getCurrentSearchParams();
  }, []);
  console.log("currentFilters:", currentFilters);
  function toggleSeed(selectedSeed: string) {
    //do not redirect yet, just build the search params.

    //if the selected seed is in currentFilters.seeds, remove it; else, add it.
    if (currentFilters?.seeds.includes(selectedSeed)) {
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
    const newSearchParams = new URLSearchParams();
    //for each seed in currentFilders.seed, add them to newSearchParams.set "seed"
    if (currentFilters?.seeds) {
      currentFilters.seeds.forEach((seed) => {
        newSearchParams.append("seed", seed);
      });
    }
    if (currentFilters?.category) {
      newSearchParams.set("category", currentFilters?.category);
    }
    //redirect

    //instead of redirecting here, we should call searchcontext.
    const newUrl = `/database?${newSearchParams.toString()}`;
    router.push(newUrl);
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
                currentFilters?.seeds.includes(seed.name) ? "on" : "off"
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
