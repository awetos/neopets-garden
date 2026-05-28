// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { GardenSubmission } from "./submission-form";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB32ve4LXHGWOSV1M79_bnrq74ne8vOzZw",
  authDomain: "neogarden-database.firebaseapp.com",
  projectId: "neogarden-database",
  storageBucket: "neogarden-database.firebasestorage.app",
  messagingSenderId: "510531565122",
  appId: "1:510531565122:web:6a5061ec4e1bf9e4ebdfdb",
  measurementId: "G-24FKJBH64E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

if (typeof window === "undefined") {
} else {
  const analytics = getAnalytics(app);
}

export const uploadToFirebase = async (data: GardenSubmission) => {
  await addDoc(collection(db, "gardenResults"), {
    seed: data.seed,
    item: data.item,
    category: data.category,
    fragment: data.fragment,
    createdAt: serverTimestamp(),
  });
};

export const getLatestSubmissions = async () => {};
