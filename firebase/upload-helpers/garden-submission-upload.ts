import { db } from "@/firebase/firebase-client";
import { GardenSubmission } from "@/types/garden-submission";
import {
  WriteBatch,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";

export const addGardenSubmissionToBatch = (
  batch: WriteBatch,
  data: GardenSubmission,
) => {
  const submissionRef = doc(collection(db, "garden-submissions"));

  batch.set(submissionRef, {
    seed: data.seed,
    item: data.item,
    category: data.category,
    fragment: data.fragment,
    createdAt: serverTimestamp(),
    modifiers: data.modifiers,
  });
};
