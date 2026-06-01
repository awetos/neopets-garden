import { runTransaction } from "firebase/firestore";
import { db } from "./firebase-client";
import { GardenResult } from "@/types/garden-result";
import { deleteItem } from "./delete-helpers/delete-item";
import { deleteGardenSubmission } from "./delete-helpers/delete-garden-submission";

export const deleteSeedById = async (data: GardenResult) => {
  try {
    await runTransaction(db, async (transaction) => {
      await deleteItem(transaction, data);
      deleteGardenSubmission(transaction, data);
    });
  } catch (error) {
    console.error("Error deleting seed by ID:", error);
    throw error;
  }
};
