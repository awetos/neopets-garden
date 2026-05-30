import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase-client";
import { GardenSubmission } from "@/components/submission-form/submission-form";
import { GardenResult } from "@/types/garden-result";

export const getLatestSubmissions = async () => {
  const submissionsRef = collection(db, "gardenResults");
  const q = query(submissionsRef, orderBy("createdAt", "desc"), limit(5));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...(doc.data() as GardenResult),
  }));
};
