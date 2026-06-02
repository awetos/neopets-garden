//updates or deletes the seeds. Remember seeds show the fragment and category amounts.
//decrement the seed in its category. Do not remove field if 0, because it's not a big deal if we have [category-name]: 0 for this.
//and also update the fragment

import { GardenResult } from "@/types/garden-result";
import { doc, increment } from "firebase/firestore";
import { db } from "../firebase-client";

import { Transaction } from "firebase/firestore";

export const updateSeedData = async (
  transaction: Transaction,
  data: GardenResult,
) => {
  const seedRef = doc(db, "seeds", data.seed);
  transaction.update(seedRef, {
    [data.category]: increment(-1),
    fragments: data.fragment === "true" ? increment(-1) : increment(0),
  });
};
