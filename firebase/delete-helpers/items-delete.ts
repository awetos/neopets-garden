import { db } from "@/firebase/firebase-client";
import { GardenResult } from "@/types/garden-result";
import { doc, increment, WriteBatch } from "firebase/firestore";

export const addItemsListToBatchDelete = (
  batch: WriteBatch,
  data: GardenResult,
) => {
  batch.set(
    doc(db, "items", data.item),
    {
      [data.category]: increment(-1),
    },
    { merge: true },
  );
};
