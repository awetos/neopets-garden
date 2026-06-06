import z from "zod";
import { categories, seedNames } from "@/types/garden-result";

const modifierSchema = z.union([
  z.literal(""),
  z
    .string()
    .min(3, "Modifier must be at least 3 characters")
    .max(60, "Modifier must be 60 characters or less"),
]);
export type SeedList = {
  fragments?: number;
} & Partial<Record<(typeof categories)[number], number>>;

export type ItemList = {
  [seedName in (typeof seedNames)[number]]?: number;
};

//we let it be "" for seed and category so that the form radio buttons reset on submit.
export const GardenSubmissionSchema = z.object({
  seed: z
    .enum(seedNames)
    .or(z.literal(""))
    .refine((value) => value !== "", {
      message: "You must select a seed",
    }),

  item: z
    .string()
    .min(3, "Item name cannot be empty and should be at least 3 characters"),

  category: z
    .enum(categories)
    .or(z.literal(""))
    .refine((value) => value !== "", {
      message: "You must select a category",
    }),

  fragment: z
    .enum(["true", "false"])
    .or(z.literal(""))
    .refine((value) => value !== "", {
      message: "You must select whether this gives a fragment",
    }),

  modifiers: z
    .array(modifierSchema)
    .max(3, "You cannot have more than 3 modifiers"),
  fragmentCharm: z.enum(["true", "false"]).or(z.literal("")),
});
export type GardenSubmissionForm = z.input<typeof GardenSubmissionSchema>;
export type GardenSubmissionSchema = z.output<typeof GardenSubmissionSchema>;
