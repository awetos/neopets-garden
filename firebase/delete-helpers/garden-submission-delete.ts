import { db } from "@/firebase/firebase-client";
import { GardenResult } from "@/types/garden-result";
import { WriteBatch, collection, doc } from "firebase/firestore";

export const addGardenSubmissionToBatchDelete = (
  batch: WriteBatch,
  data: GardenResult,
) => {
  const submissionRef = doc(db, "garden-submissions", data.id);

  batch.delete(submissionRef);
};
