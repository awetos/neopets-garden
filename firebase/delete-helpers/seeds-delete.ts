import { db } from "@/firebase/firebase-client";
import { GardenResult } from "@/types/garden-result";
import { doc, increment, WriteBatch } from "firebase/firestore";

export const addSeedsListToBatchDelete = (
  batch: WriteBatch,
  data: GardenResult,
) => {
  batch.set(
    doc(db, "seeds", data.seed),
    {
      [data.category]: increment(-1),
      fragments: data.fragment === "true" ? increment(-1) : increment(0),
    },
    { merge: true },
  );
};
