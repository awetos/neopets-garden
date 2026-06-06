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
} from "firebase/firestore";
import { db } from "../firebase-client";
import { GardenResult } from "@/types/garden-result";
import { normalizeItemName } from "../upload/upload-submission";
//no item name: just search results for category and seed type.
//contains item name?, search in items first. key = item.
//return an empty
export const GetFromFirebase = async (searchQuery: SearchQuery) => {
  const submissionsRef = collection(db, "garden-submissions");
  const constraints: QueryConstraint[] = [];

  constraints.push(limit(20));

  if (searchQuery.item) {
    console.log("Searching for item, ", searchQuery.item);
    const normalizedItem = normalizeItemName(searchQuery.item);

    const itemRef = doc(db, "items", normalizedItem);
    const itemSnap = await getDoc(itemRef);

    if (!itemSnap.exists()) {
      return [];
    }

    constraints.push(where("item", "==", normalizedItem));
  }

  if (searchQuery.seeds && searchQuery.seeds.length > 0) {
    console.log("searching for seed:", searchQuery.seeds);
    constraints.push(where("seed", "in", searchQuery.seeds));
  }

  if (searchQuery.category) {
    constraints.push(where("category", "==", searchQuery.category));
  }

  constraints.push(orderBy("createdAt", "desc"));

  const q = query(collection(db, "garden-submissions"), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...(doc.data() as GardenResult),
    id: doc.id,
  }));
};
