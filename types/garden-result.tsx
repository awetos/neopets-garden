import { seeds } from "@/types/seeds";

export const seedNames = seeds.map((seed) => seed.name) as [string];
export const categories = [
  "food",
  "gardening",
  "paintbrush",
  "petpet",
  "other",
] as const;
