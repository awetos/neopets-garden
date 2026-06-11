import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-client";
import { SeedStat } from "@/types/garden-result";
export const getSeedsStats = async () => {
  const seedsRef = collection(db, "seeds");
  const seedsSnap = await getDocs(seedsRef);
  return seedsSnap.docs.map(
    (doc): SeedStat => ({
      seed: doc.id,
      stats: doc.data(),
    }),
  );
};
