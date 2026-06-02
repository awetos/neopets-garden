//For global, update ts:
/**
 *    totalSeeds: increment(1),
      totalFragments: data.fragment === "true" ? increment(1) : increment(0),
      seeds: {
        [data.seed]: increment(1),
      },
      categories: {
        [data.category]: increment(1),
      },
 */

import { GardenResult } from "@/types/garden-result";
import { doc, increment } from "firebase/firestore";
import { db } from "../firebase-client";

import { Transaction } from "firebase/firestore";
export const updateGlobalData = async (
  transaction: Transaction,
  data: GardenResult,
) => {
  const globalRef = doc(db, "global", "allStats");
  transaction.update(globalRef, {
    totalSeeds: increment(-1),
    totalFragments: data.fragment === "true" ? increment(-1) : increment(0),
    [`seeds.${data.seed}`]: increment(-1),
    [`categories.${data.category}`]: increment(-1),
  });
};
