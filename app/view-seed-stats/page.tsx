"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";
import Image from "next/image";
import Loading from "@/components/loading";
import Heading from "@/components/about/heading";
import { SeedList } from "@/types/garden-submission";
import { getSeedStatsBySeed } from "@/firebase/get-seed-stats";
import BasicInfo from "./basic-info";

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
          {seedCategory &&
            seedPath &&
            totalSeeds &&
            BasicInfo(
              seedCategory,
              totalSeeds,
              seedPath,
              seedCategoryInfo?.fragments ?? 0,
            )}
          {/*Create a 3 column table by mapping our enumeratedCategories. 
          for each row (SortedCategory item in enumeratedCategories) the first column is the category. 
          Second is the total seeds of that category. Third is the percentage to 2 decimal places based on total. 
            You may use totalSeeds as the value to help calculate the percent*/}
          {enumeratedCategories && totalSeeds && (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border-b p-2 text-left">Category</th>
                  <th className="border-b p-2 text-right">Seeds</th>
                  <th className="border-b p-2 text-right">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {enumeratedCategories.map((category) => (
                  <tr key={category.category}>
                    <td className="p-2">{category.category}</td>
                    <td className="p-2 text-right">{category.count}</td>
                    <td className="p-2 text-right">
                      {(category.percentage * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
//iterate through all the categories and add the sum of the number
export function getTotalSeeds(currentSeed: SeedList): number {
  const { fragments, ...categoryStats } = currentSeed;

  return Object.values(categoryStats).reduce(
    (sum, value) => sum + (value ?? 0),
    0,
  );
}

//returns the category and count for each category sorted by most popular.
export type SortedCategory = {
  category: string;
  count: number;
  percentage: number;
};

export function getSortedCategories(
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
