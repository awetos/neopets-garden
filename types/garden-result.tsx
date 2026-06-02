import { seeds } from "@/types/seeds";
import { Timestamp } from "firebase/firestore";

export const seedNames = seeds.map((seed) => seed.name);

export const categories = [
  "food",
  "gardening",
  "paintbrush",
  "petpet",
  "other",
] as const;

//this is the type stored on Firebase, but not submitted locally
export type GardenResult = {
  id: string;
  item: string;
  createdAt: Timestamp;
  seed: string;
  category: (typeof categories)[number];
  fragment: "true" | "false";
  modifiers: string[] | null;
  fragmentCharm: string;
};
