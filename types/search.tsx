import z from "zod";
const ItemNameSchema = z.union([
  z.literal(""),
  z.string().min(3, "Item name should be at least 3 characters."),
]);

export const ItemSearchSchema = z.object({
  itemName: ItemNameSchema,
});

export type ItemSearch = z.input<typeof ItemSearchSchema>;
