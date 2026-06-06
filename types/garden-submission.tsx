import z from "zod";
import { categories, seedNames } from "@/types/garden-result";

const modifierSchema = z.union([
  z.literal(""),
  z
    .string()
    .min(3, "Modifier must be at least 3 characters")
    .max(60, "Modifier must be 60 characters or less"),
]);

//we let it be "" for seed and category so that the form radio buttons reset on submit.
export const GardenSubmissionSchema = z.object({
  seed: z.enum(seedNames, "You must select a seed").or(z.literal("")),
  item: z
    .string()
    .min(3, "Item name cannot be empty and should be at least 3 characters"),
  category: z.enum(categories, "Not a valid type"),
  fragment: z.enum(["true", "false"]),
  modifiers: z
    .array(modifierSchema)
    .max(3, "You cannot have more than 3 modifiers"),
  fragmentCharm: z.enum(["true", "false"]).or(z.literal("")),
});
export type GardenSubmission = z.input<typeof GardenSubmissionSchema>;

export type SeedList = {
  fragments?: number;
} & Partial<Record<(typeof categories)[number], number>>;

export type ItemList = {
  [seedName in (typeof seedNames)[number]]?: number;
};
