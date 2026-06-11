import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase-client";
export const getSeedsStats = async () => {
  const seedsRef = collection(db, "seeds");
  const seedsSnap = await getDocs(seedsRef);
};
