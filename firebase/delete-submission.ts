import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase-client";
import { FirebaseError } from "firebase/app";

export const deleteSeedById = async (id: string) => {
  const docRef = doc(db, "gardenResults", id);
  try {
    await deleteDoc(docRef);
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
