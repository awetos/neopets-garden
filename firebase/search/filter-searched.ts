import { SearchQuery } from "@/context/SearchCache";
import {
  collection,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  getDocs,
  QueryConstraint,
  where,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase-client";
import { GardenResult } from "@/types/garden-result";
import { normalizeItemName } from "../upload/upload-submission";
import { FirebaseError } from "firebase/app";

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
type SearchOptions = {
  lastDoc?: QueryDocumentSnapshot;
};
const PAGE_SIZE = 20;
//no item name: just search results for category and seed type.
//contains item name?, search in items first. key = item.
//return an empty
export const GetFromFirebase = async (
  searchQuery: SearchQuery,
  options?: SearchOptions,
) => {
  try {
    const submissionsRef = collection(db, "garden-submissions");
    const constraints: QueryConstraint[] = [];
    if (searchQuery.item) {
      const normalizedItem = normalizeItemName(searchQuery.item);

      const itemRef = doc(db, "items", normalizedItem);
      const itemSnap = await withTimeout(getDoc(itemRef), 1000);
      if (!itemSnap.exists()) {
        return {
          results: [],
          firstDoc: null,
          lastDoc: null,
          hasNextPage: false,
        };
      }

      constraints.push(where("item", "==", normalizedItem));
    }

    if (searchQuery.seeds && searchQuery.seeds.length > 0) {
      constraints.push(where("seed", "in", searchQuery.seeds));
    }

    if (searchQuery.category) {
      constraints.push(where("category", "==", searchQuery.category));
    }

    // orderBy BEFORE startAfter
    constraints.push(orderBy("createdAt", "desc"));

    if (options?.lastDoc) {
      constraints.push(startAfter(options.lastDoc));
    }

    // limit LAST
    constraints.push(limit(PAGE_SIZE + 1));

    const q = query(collection(db, "garden-submissions"), ...constraints);

    const snapshot = await withTimeout(getDocs(q), 10000);
    const docs = snapshot.docs;
    const hasNextPage = docs.length > PAGE_SIZE;
    const pageDocs = docs.slice(0, PAGE_SIZE);
    console.log("Docs returned:", snapshot.docs.length);
    console.log("From cache:", snapshot.metadata.fromCache);
    return {
      results: pageDocs.map((doc) => ({
        ...(doc.data() as GardenResult),
        id: doc.id,
      })),
      firstDoc: pageDocs[0] ?? null,
      lastDoc: pageDocs[pageDocs.length - 1] ?? null,
      hasNextPage,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        results: [],
        firstDoc: null,
        lastDoc: null,
        hasNextPage: false,
        error: error.message,
      };
    } else {
      return {
        results: [],
        firstDoc: null,
        lastDoc: null,
        hasNextPage: false,
        error: "Something went wrong",
      };
    }
  }
};
