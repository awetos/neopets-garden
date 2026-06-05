export const ItemSearchSchema = z.object({
  itemName: z
    .string()
    .min(3, "Item name should be at least 3 characters.")
    .optional(),
});

export type ItemSearch = z.input<typeof ItemSearchSchema>;
