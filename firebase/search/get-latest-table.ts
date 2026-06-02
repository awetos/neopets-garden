import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase-client";
import { GardenResult } from "@/types/garden-result";

export const getLatestTable = async () => {
  const submissionsRef = collection(db, "garden-submissions");
  const q = query(submissionsRef, orderBy("createdAt", "desc"), limit(20));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...(doc.data() as GardenResult),
    id: doc.id,
  }));
};
