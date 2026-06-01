import { db } from "./firebase-client";
import { FirebaseError } from "firebase/app";
import { GardenResult } from "@/types/garden-result";
import { writeBatch } from "firebase/firestore";
import { addGardenSubmissionToBatchDelete } from "./delete-helpers/garden-submission-delete";
import { addGlobalStatsToBatchDelete } from "./delete-helpers/global-stats-delete";
import { addSeedsListToBatchDelete } from "./delete-helpers/seeds-delete";
import { addItemsListToBatchDelete } from "./delete-helpers/items-delete";

export const deleteSeedById = async (id: string, data: GardenResult) => {
  try {
    const batch = writeBatch(db);

    addGardenSubmissionToBatchDelete(batch, data);
    addGlobalStatsToBatchDelete(batch, data);
    addSeedsListToBatchDelete(batch, data);
    addItemsListToBatchDelete(batch, data);

    await batch.commit();
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error("Firebase delete failed: " + error.message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Something went wrong with deleting.");
  }
};
