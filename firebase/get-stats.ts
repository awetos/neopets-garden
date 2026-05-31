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
import { categories } from "@/types/garden-result";
import { seeds } from "@/types/seeds";

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
