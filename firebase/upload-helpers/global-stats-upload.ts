import { db } from "@/firebase/firebase-client";
import { GardenSubmission } from "@/types/garden-submission";
import { WriteBatch, doc, increment } from "firebase/firestore";

export const addGlobalStatsToBatch = (
  batch: WriteBatch,
  data: GardenSubmission,
) => {
  batch.set(
    doc(db, "global", "allStats"),
    {
      totalSeeds: increment(1),
      totalFragments: data.fragment === "true" ? increment(1) : increment(0),
      seeds: {
        [data.seed]: increment(1),
      },
      categories: {
        [data.category]: increment(1),
      },
    },
    { merge: true },
  );
};
