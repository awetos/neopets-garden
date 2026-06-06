"use client";
import { seeds } from "@/types/seeds";
import { categories } from "@/types/garden-result";
import classes from "./filter-selector.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchContext } from "@/context/SearchCache";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { SearchQuery } from "@/context/SearchCache";
import { ItemSearch, ItemSearchSchema } from "@/types/search";
export default function FilterSelector() {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const [currentFilters, setCurrentFilters] = useState<SearchQuery>();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<ItemSearch>({
    defaultValues: {
      itemName: currentFilters?.item ?? "",
    },
    resolver: zodResolver(ItemSearchSchema),
  });

  const searchContext = useSearchContext();
  useEffect(() => {
    const currentParams: SearchQuery = {
      seeds: searchParams.getAll("seed"),
      category: searchParams.get("category") ?? "",
      item: searchParams.get("item") ?? "",
    };
    setCurrentFilters(currentParams);
    searchContext.updateCurrentSearchQuery(currentParams);
    //we use currentParams intead of currentFilter becasue currentFilter is a state that only updates on next render

    setValue("itemName", currentParams?.item ?? "");
  }, [searchParamsString]);

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
  const runSearch: SubmitHandler<ItemSearch> = (data) => {
    if (currentFilters) {
      if (data.itemName) {
        const newFilters = {
          ...currentFilters,
          item: data.itemName,
        };
        //we cannot merely useState because it won't run right away, so we had to create this.
        setCurrentFilters(newFilters);
        searchContext.runSearch({ ...currentFilters, item: data.itemName });
      } else {
        //it is possible the user removed the item name, but the currentFilters may still have them saved.
        searchContext.runSearch({ ...currentFilters, item: "" });
      }
    }
  };

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
      <div className="pl-5 text-lg font-bold"> Item Search </div>
      <div className="mx-5 mb-2 border-b-2 border-amber-500"></div>
      <form onSubmit={handleSubmit(runSearch)}>
        <div className="flex flex-col items-center px-5 text-center md:flex-row">
          <div className="flex w-fit">
            <p>Search for an Item:</p>
          </div>
          <div className="flex w-full flex-1">
            <input
              {...register("itemName")}
              autoComplete="off"
              type="text"
              className="mx-auto w-[80%] border-2 border-zinc-500 bg-white px-2 font-normal disabled:bg-zinc-200 disabled:text-gray-600 md:mx-2 md:w-full"
              disabled={isSubmitting}
            ></input>
          </div>
        </div>
        {errors.itemName?.message && (
          <div className="text-center text-sm font-normal text-red-500">
            {errors.itemName.message}
          </div>
        )}
        <div className="flex flex-row items-center justify-center">
          <button
            type="submit"
            className="m-5 w-sm max-w-full bg-amber-400 p-2 text-center hover:cursor-pointer"
            //Handle submit will call the zod resolver, so if there are errors in input it appears. Otherwise, goahead and run search.
          >
            Apply Filter
          </button>
        </div>{" "}
      </form>
    </div>
  );
}
