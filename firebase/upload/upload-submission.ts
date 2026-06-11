import { db } from "@/firebase/firebase-client";
import { GardenSubmission } from "@/types/garden-submission";
import { writeBatch } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { addGardenSubmissionToBatch } from "./upload-helpers/garden-submission-upload";
import { addGlobalStatsToBatch } from "./upload-helpers/global-stats-upload";
import { addItemsListToBatch } from "./upload-helpers/items-upload";
import { addSeedsListToBatch } from "./upload-helpers/seeds-upload";

/*In order to limit document reads, we upload to 4 collections: 
1. raw submissions: each upload has a unique ID; limit retrieval by 20. 
2. total stats: a document containing all seed uploads for users to quickly see their seed has been added to the database
3. seeds: a breakdown of categories and fragment rates per seed.
4. items: a count of how many times an item has been added into which seed. Do not save the category because some people may put the wrong category.

In order to see the exact seed submissions that caused the item, we will need to index the raw submissions in search of the item. 
This may be costly, but not overkill for now and allows us to continue development
If it becomes overkill (eg. easily exceeding 10k reads a day) then we will move to a sql database then. 
*/
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              "Upload timed out. Firebase may be overloaded or quota-limited.",
            ),
          ),
        ms,
      ),
    ),
  ]);
}

export const uploadToFirebase = async (
  data: GardenSubmission,
): Promise<void> => {
  try {
    data.item = normalizeItemName(data.item);

    const batch = writeBatch(db);

    addGardenSubmissionToBatch(batch, data);
    addGlobalStatsToBatch(batch, data);
    addSeedsListToBatch(batch, data);
    addItemsListToBatch(batch, data);

    await withTimeout(batch.commit(), 1000);
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Something went wrong with submission.");
  }
};

//removes leading and trailling white space
//converts multiple spaces into just 1
//capitalizes the first letter if applicable
//5 dubloon coin => 5 Dubloon Coin
export const normalizeItemName = (item: string): string => {
  return item
    .replace(/!/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
