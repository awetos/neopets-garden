import { db } from "@/firebase/firebase-client";
import { GardenSubmission } from "@/types/garden-submission";
import { doc, increment, WriteBatch } from "firebase/firestore";

export const addSeedsListToBatch = (
  batch: WriteBatch,
  data: GardenSubmission,
) => {
  batch.set(
    doc(db, "seeds", data.seed),
    {
      [data.category]: increment(1),
      fragments: data.fragment === "true" ? increment(1) : increment(0),
    },
    { merge: true },
  );
};
