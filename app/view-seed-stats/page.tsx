"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";
import Image from "next/image";
import Loading from "@/components/loading";
import Heading from "@/components/about/heading";
import { SeedList } from "@/types/garden-submission";
import { getSeedStatsBySeed } from "@/firebase/get-seed-stats";

export default function ViewSeedPage() {
  const searchParams = useSearchParams();
  const seedCategory = searchParams.get("seed_category");
  const [seedCategoryInfo, setSeedCategoryInfo] = useState<SeedList>();

  //ranked categories, in the shape of {category, number, percent}
  const [enumeratedCategories, setEnumeratedCategories] =
    useState<SortedCategory[]>();
  const [totalSeeds, setTotalSeeds] = useState<number>();
  const [seedPath, setSeedPath] = useState<string>();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getSeedData() {
      if (!seedCategory) {
        setIsLoading(false);
        return;
      }
      if (seedCategory) {
        const res = await getSeedStatsBySeed(seedCategory);
        if (!res) {
          setIsLoading(false);
          return;
        }
        setSeedCategoryInfo(res);

        const total = getTotalSeeds(res);
        setTotalSeeds(total);

        const categories = getSortedCategories(res, total);
        setEnumeratedCategories(categories);

        //find the image path for the seed.
        const foundSeed = seeds.find((seed) => seed.name === seedCategory);
        setSeedPath(foundSeed?.path);

        //get the total seeds and set them.
      }

      setIsLoading(false);
    }

    getSeedData();
  }, [searchParams]);

  return (
    <div>
      {!isLoading && (
        <>
          <Heading title={`Viewing stats on ${seedCategory}`} />
          <p>{seedCategory}</p>
          {!seedCategoryInfo && <p>No info found on this category.</p>}
          <br />
          {seedCategoryInfo &&
            (seedCategoryInfo.fragments
              ? "0 fragments in this seed"
              : `${seedCategoryInfo.fragments} fragments in this seed`)}
          <br />
          {totalSeeds ? `${totalSeeds} total seeds` : "no total"}
        </>
      )}
    </div>
  );
}
//iterate through all the categories and add the sum of the number
function getTotalSeeds(currentSeed: SeedList): number {
  const { fragments, ...categoryStats } = currentSeed;

  return Object.values(categoryStats).reduce(
    (sum, value) => sum + (value ?? 0),
    0,
  );
}

//returns the category and count for each category sorted by most popular.
type SortedCategory = {
  category: string;
  count: number;
  percentage: number;
};

function getSortedCategories(
  currentSeed: SeedList,
  totalSeeds: number,
): SortedCategory[] {
  const { fragments, ...categories } = currentSeed;

  return Object.entries(categories)
    .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
    .map(([category, count]) => ({
      category,
      count: count,
      percentage: (count ?? 0) / totalSeeds,
    }));
}
