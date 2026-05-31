import { db } from "@/firebase/firebase-client";
import { GardenSubmission } from "@/types/garden-submission";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  increment,
} from "firebase/firestore";

export const uploadToFirebase = async (data: GardenSubmission) => {
  await addDoc(collection(db, "gardenResults"), {
    seed: data.seed,
    item: data.item,
    category: data.category,
    fragment: data.fragment,
    createdAt: serverTimestamp(),
    modifiers: data.modifiers,
  });

  await setDoc(
    doc(db, "global", "allStats"),
    {
      totalSeeds: increment(1),
      totalFragments: data.fragment === "true" ? increment(1) : increment(0),
      seeds: {
        [data.seed]: increment(1),
      },
      categories: {
        [data.category]: increment(1),
      },
    },
    { merge: true },
  );
};
