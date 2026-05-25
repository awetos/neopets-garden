import { z } from "zod";
import { seeds } from "@/types/seeds";

export const seedNames = seeds.map((seed) => seed.name) as [
  string,
  ...string[],
];
export const categories = [
  "food",
  "gardening",
  "paintbrush",
  "petpet",
  "other",
] as const;

export const gardenResultSchema = z.object({
  seed: z.enum(seedNames, "error you need a seed name"),

  item: z.string().min(1, "item cannot be blank"),
  itemCategory: z.enum(categories, "category cannot be blank"),

  fragment: z.boolean().optional(),
  fertilizerUse: z.string().optional(),
  rareItemBuffRate: z.number().optional(),
});

export type GardenResult = z.infer<typeof gardenResultSchema>;
