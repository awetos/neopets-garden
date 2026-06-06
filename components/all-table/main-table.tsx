"use client";
import { GardenResult } from "@/types/garden-result";
import { useEffect, useState } from "react";
import { seeds } from "@/types/seeds";

import Image from "next/image";
import classes from "./main-table.module.css";
import { getLatestTable } from "@/firebase/search/get-latest-table";
import Link from "next/link";
import { useSearchContext } from "@/context/SearchCache";

//we can use the search params as sort of a save state so we don't have to have so many context providers.
export default function MainTable() {
  const searchContext = useSearchContext();
  const latestData = searchContext.currentCache;
  return (
    <>
      {searchContext.isLoading && searchContext?.lastQuery?.item && (
        <p>Last item was: {searchContext?.lastQuery?.item}</p>
      )}
      <table className="w-full table-fixed bg-amber-300">
        <colgroup>
          <col className="table-column w-1/8 md:w-1/12" />
          <col className="hidden md:table-column md:w-2/12" />
          <col className="table-column w-6/8 md:w-5/12" />
          <col className="hidden md:table-column md:w-3/12" />
          <col className="table-column w-1/8 md:w-1/12" />
        </colgroup>

        <thead>
          <tr>
            <th></th>
            <th className="hidden md:table-cell">Seed Name</th>
            <th>Item</th>
            <th className="hidden md:table-cell">Category</th>
            <th>Frag</th>
          </tr>
        </thead>
        <tbody>
          {searchContext.isLoading && (
            <tr>
              <td colSpan={5} className="py-2 text-center">
                Loading Submissions...
              </td>
            </tr>
          )}

          {!searchContext.isLoading && latestData.length < 1 && (
            <tr>
              <td colSpan={5} className="py-2 text-center">
                There are no submissions
              </td>
            </tr>
          )}

          {!searchContext.isLoading &&
            latestData.map((data) => {
              const foundSeed = seeds.find((seed) => seed.name === data.seed);
              const href = `/view-seed?id=${data.id}`;

              return (
                <tr
                  key={data.id}
                  className={`${classes.tableRow} overflow-hidden whitespace-nowrap hover:font-bold`}
                >
                  <td>
                    {foundSeed && (
                      <Link
                        href={href}
                        className="flex h-full w-full items-center justify-center"
                      >
                        <Image
                          src={foundSeed.clearPath}
                          alt={`Image of ${data.seed}`}
                          width={30}
                          height={30}
                          className="mx-auto"
                        />
                      </Link>
                    )}
                  </td>

                  <td className="hidden md:table-cell">
                    <Link
                      href={href}
                      className="hidden h-full w-full items-center justify-center md:flex"
                    >
                      {data.seed}
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={href}
                      className="flex h-full w-full items-center justify-center"
                    >
                      {data.item}
                    </Link>
                  </td>
                  <td className="hidden md:table-cell">
                    <Link
                      href={href}
                      className="hidden h-full w-full items-center justify-center md:flex"
                    >
                      {data.category}
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={href}
                      className="flex h-full w-full items-center justify-center"
                    >
                      {data.fragment}
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
