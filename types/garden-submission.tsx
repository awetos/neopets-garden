import z from "zod";
import { categories, seedNames } from "@/types/garden-result";

const modifierSchema = z.union([
  z.literal(""),
  z
    .string()
    .min(3, "Modifier must be at least 3 characters")
    .max(60, "Modifier must be 60 characters or less"),
]);

export const GardenSubmissionSchema = z.object({
  seed: z.enum(seedNames, "You must select a seed"),
  item: z
    .string()
    .min(3, "Item name cannot be empty and should be at least 3 characters"),
  category: z.enum(categories, "Not a valid type"),
  fragment: z.enum(["true", "false"]),
  modifiers: z
    .array(modifierSchema)
    .max(3, "You cannot have more than 3 modifiers")
    .min(
      2,
      "You must have at least 2 modifiers, this is for testing purposes.",
    ),
});
export type GardenSubmission = z.input<typeof GardenSubmissionSchema>;
