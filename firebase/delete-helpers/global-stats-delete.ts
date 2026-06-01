import { db } from "@/firebase/firebase-client";
import { GardenResult } from "@/types/garden-result";
import { WriteBatch, collection, increment, doc } from "firebase/firestore";

export const addGlobalStatsToBatchDelete = (
  batch: WriteBatch,
  data: GardenResult,
) => {
  const globalStatsRef = doc(collection(db, "global"), "allStats");
  batch.set(
    globalStatsRef,
    {
      totalSeeds: increment(-1),
      totalFragments: data.fragment === "true" ? increment(-1) : increment(0),
      seeds: {
        [data.seed]: increment(-1),
      },
      categories: {
        [data.category]: increment(-1),
      },
    },
    { merge: true },
  );
};
