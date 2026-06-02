import { GardenResult } from "@/types/garden-result";
import { Transaction } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase/firebase-client";

//no throwing errors, this is just queueing the action for the transaction
export const deleteGardenSubmission = (
  transaction: Transaction,
  data: GardenResult,
) => {
  const gardenResultRef = doc(db, "garden-submissions", data.id);
  transaction.delete(gardenResultRef);
};
