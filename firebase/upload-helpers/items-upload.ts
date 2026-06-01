import { db } from "@/firebase/firebase-client";
import { GardenSubmission } from "@/types/garden-submission";
import { doc, increment, WriteBatch } from "firebase/firestore";

export const addItemsListToBatch = (
  batch: WriteBatch,
  data: GardenSubmission,
) => {
  batch.set(
    doc(db, "items", data.item),
    {
      [data.category]: increment(1),
    },
    { merge: true },
  );
};
