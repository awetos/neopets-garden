import { db } from "@/firebase/firebase-client";
import { GardenSubmission } from "@/components/submission-form/submission-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const uploadToFirebase = async (data: GardenSubmission) => {
  await addDoc(collection(db, "gardenResults"), {
    seed: data.seed,
    item: data.item,
    category: data.category,
    fragment: data.fragment,
    createdAt: serverTimestamp(),
  });

  await addDoc(collection(db, "gardenResults"), {});
};
