"use client";
import { SeedStat } from "@/types/garden-result";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";
import Image from "next/image";
import Link from "next/link";

export default function SeedCard(currentSeed: SeedStat) {
  const [seedPath, setSeedPath] = useState<string>();
  const [statsInfo, setStatsInfo] = useState<string[][]>();
  useEffect(() => {
    function findSeedImage() {
      const foundSeed = seeds.find((seed) => seed.name === currentSeed.seed);
      setSeedPath(foundSeed?.path);
      const mostPopular = getMostPopularCategory(currentSeed);

      const statsRows = [
        ["Total Seeds", getTotalSeeds(currentSeed).toLocaleString()],
        [
          "Total Fragments",
          (currentSeed.stats.fragments ?? 0).toLocaleString(),
        ],
        [
          "Fragment Drop Rate",
          `${(
            ((currentSeed.stats.fragments ?? 0) / getTotalSeeds(currentSeed)) *
            100
          ).toFixed(2)}%`,
        ],
        [
          "Most Popular Category",
          `${mostPopular.category} (${mostPopular.count})`,
        ],
      ];
      setStatsInfo(statsRows);
    }
    findSeedImage();
  }, []);
  //If you want to add alternating row colors: className={index % 2 === 0 ? "bg-amber-100" : "bg-amber-200"}
  return (
    <Link
      href={`/view-seed-stats?seed_category=${encodeURIComponent(currentSeed.seed)}`}
    >
      <div className="overflow-hidden rounded-lg border-2 border-amber-300 bg-amber-100 hover:ring-2 hover:ring-black">
        <div className="border-b-2 border-b-amber-400 bg-amber-300 text-center">
          {currentSeed.seed}
        </div>
        <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2">
          <table className="order-2 w-full text-sm md:order-1">
            <colgroup>
              <col className="w-1/2" />
              <col className="w-1/2" />
            </colgroup>
            <tbody>
              {statsInfo &&
                statsInfo.map(([label, value], index) => (
                  <tr
                    key={label}
                    className={
                      index < statsInfo.length - 1
                        ? "border-b-2 border-amber-300"
                        : ""
                    }
                  >
                    <th className="px-0 py-0 text-right font-semibold">
                      {label}
                    </th>
                    <td className="px-0 py-0 text-center">{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="relative order-1 flex h-full w-full items-center justify-center bg-white md:order-2 md:aspect-square">
            {seedPath ? (
              <Image
                src={seedPath}
                alt={currentSeed.seed}
                width={80}
                height={80}
              />
            ) : (
              `Can not find image for ${currentSeed.seed}`
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

//iterate through all the categories and add the sum of the number
function getTotalSeeds(currentSeed: SeedStat): number {
  const { fragments, ...categoryStats } = currentSeed.stats;

  return Object.values(categoryStats).reduce(
    (sum, value) => sum + (value ?? 0),
    0,
  );
  return 0;
}

//returns the string and number for most popular category.
function getMostPopularCategory(currentSeed: SeedStat) {
  const { fragments, ...categories } = currentSeed.stats;

  const sortedCategories = Object.entries(categories).sort(
    ([, a], [, b]) => (b ?? 0) - (a ?? 0),
  );

  const [category, count] = sortedCategories[0] ?? ["None", 0];

  return {
    category,
    count,
  };
}
