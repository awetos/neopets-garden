//returns the header image and basic info like fragments
import { SeedList } from "@/types/garden-submission";
import { useEffect, useState } from "react";

import { seeds } from "@/types/seeds";
import Image from "next/image";
//this only gets called after the useEffect on its parent runs, so seed is never null.
export default function BasicInfo(
  seedCategory: string,
  totalSeeds: number,
  seedPath: string,
  fragments: number,
) {
  return (
    <div className="flex flex-row">
      <div className="flex w-full flex-1 flex-col p-2">
        <div>
          <b>Total Seeds:</b> {totalSeeds}
        </div>
        <div>
          <b>Total Fragments:</b> {fragments}
        </div>
        <div>
          <b>Fragment droprate:</b>
          {((fragments / totalSeeds) * 100).toFixed(2)}%
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        {seedPath && (
          <Image src={seedPath} width={80} height={80} alt={seedCategory} />
        )}
      </div>
    </div>
  );
}
