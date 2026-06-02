"use client";
import { GardenResult } from "@/types/garden-result";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import classes from "./main-table.module.css";
import { getLatestTable } from "@/firebase/search/get-latest-table";

export default function MainTable() {
  const router = useRouter();

  const [latestData, setLatestData] = useState<GardenResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const refreshKey = searchParams.get("refresh");

  useEffect(() => {
    async function loadLatestData() {
      const data = await getLatestTable();
      setLatestData(data);
      setIsLoading(false);
    }

    loadLatestData();
  }, [refreshKey]);
  console.log(latestData);
  return (
    <>
      <table className="w-full bg-amber-300">
        <colgroup>
          <col className="w-1/12" />
          <col className="w-2/12" />
          <col className="w-5/12" />
          <col className="w-3/12" />
          <col className="w-1/12" />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>Seed Name</th>
            <th>Item</th>
            <th>Category</th>
            <th>Frag</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={5} className="py-2 text-center">
                Loading Submissions...
              </td>
            </tr>
          )}

          {!isLoading && latestData.length < 1 && (
            <tr>
              <td colSpan={5} className="py-2 text-center">
                There are no submissions
              </td>
            </tr>
          )}

          {!isLoading &&
            latestData.map((data) => {
              const foundSeed = seeds.find((seed) => seed.name === data.seed);

              return (
                <tr key={data.id} className={classes.tableRow}>
                  <td>
                    {foundSeed && (
                      <Image
                        src={foundSeed.clearPath}
                        alt={`Image of ${data.seed}`}
                        width={30}
                        height={30}
                        className="mx-auto"
                      />
                    )}
                  </td>

                  <td>{data.seed}</td>
                  <td>{data.item}</td>
                  <td>{data.category}</td>
                  <td>{data.fragment}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
