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
import { GardenResult, categories, seedNames } from "@/types/garden-result";
import { seeds } from "@/types/seeds";

export const getLatestSubmissions = async () => {
  const submissionsRef = collection(db, "gardenResults");
  const q = query(submissionsRef, orderBy("createdAt", "desc"), limit(5));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...(doc.data() as GardenResult),
    id: doc.id,
  }));
};

export const getSeedById = async (id: string) => {
  const docRef = doc(db, "gardenResults", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists()
    ? { ...(docSnap.data() as GardenResult), id: docSnap.id }
    : null;
};
export type SeedName = (typeof seeds)[number]["name"];

export type AllStatsStructure = {
  totalFragments: number;
  totalSeeds: number;
  categories: Record<(typeof categories)[number], number>;
  seeds: Record<SeedName, number>;
};

export const getLatestStats = async () => {
  const allStatsRef = doc(db, "global", "allStats");
  const allStatsRefSnap = await getDoc(allStatsRef);
  return allStatsRefSnap.exists()
    ? (allStatsRefSnap.data() as AllStatsStructure)
    : null;
};
