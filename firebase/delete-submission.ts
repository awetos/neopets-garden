import { deleteDoc, setDoc, increment, doc } from "firebase/firestore";
import { db } from "./firebase-client";
import { FirebaseError } from "firebase/app";
import { GardenResult } from "@/types/garden-result";

export const deleteSeedById = async (id: string, data: GardenResult) => {
  const docRef = doc(db, "gardenResults", id);
  try {
    await deleteDoc(docRef);
    await setDoc(
      doc(db, "global", "allStats"),
      {
        totalSeeds: increment(-1),
        totalFragments: data.fragment === "true" ? increment(-1) : increment(0),
        seeds: {
          [data.seed]: increment(-1),
        },
        categories: {
          [data.category]: increment(-1),
        },
      },
      { merge: true },
    );
  } catch (e) {
    if (e instanceof FirebaseError) {
      return {
        success: false,
        message: `${e.code}: ${e.message}`,
      };
    }

    return {
      success: false,
      message: `Unknown error occurred.`,
    };
  }

  return {
    success: true,
    message: `Seed with id ${id} has been deleted`,
  };
};
