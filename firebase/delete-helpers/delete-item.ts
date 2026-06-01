//updates or deletes the seeds. Remember, the item list only shows seed it was dropped from, aka a partial seedslist.

import { GardenResult } from "@/types/garden-result";
import { deleteField, doc, increment } from "firebase/firestore";
import { db } from "../firebase-client";

import { Transaction } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

//First we read our item entry to see whether we should delete or update the doc.
//Since the read might fail, we should throw an error if that happens
export const deleteItem = async (
  transaction: Transaction,
  data: GardenResult,
) => {
  try {
    const itemRef = doc(db, "items", data.item);
    // 1. Read the item document inside the transaction
    const itemSnap = await transaction.get(itemRef);

    if (!itemSnap.exists()) {
      throw new Error(`Item doc does not exist: ${data.item}`);
    }

    const itemData = itemSnap.data();

    const currentSeedCount = itemData[data.seed]; //should never be zero if we are clearing properly.

    const hasOtherPositiveSeedCounts = Object.entries(itemData).some(
      ([seedName, count]) =>
        seedName !== data.seed && typeof count === "number" && count > 0,
    );

    // 2. Depending on if it is the only entry in that item, we should delete.
    if (currentSeedCount <= 1) {
      if (hasOtherPositiveSeedCounts) {
        // Delete only this seed field from the item doc
        transaction.update(itemRef, {
          [data.seed]: deleteField(),
        });
      } else {
        // This was the last positive seed count, so delete the whole item doc
        transaction.delete(itemRef);
      }
    } else {
      // More than 1 exists, so just decrement
      transaction.update(itemRef, {
        [data.seed]: increment(-1),
      });
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }

    if (error instanceof Error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }

    throw new Error("Failed to delete item: Unknown error");
  }
};
