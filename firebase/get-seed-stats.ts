import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-client";
import { SeedStat } from "@/types/garden-result";
import { SeedList } from "@/types/garden-submission";

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

export const getSeedStatsBySeed = async (
  seedName: string,
): Promise<SeedList> => {
  const seedsRef = doc(db, "seeds", seedName);
  const seedsSnap = await getDoc(seedsRef);
  return seedsSnap.data() as SeedList;
};
