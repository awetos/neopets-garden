import { UseFormRegister, FieldErrors } from "react-hook-form";
import { categories, type GardenResult } from "@/types/garden-result";

type Props = {
  register: UseFormRegister<GardenResult>;
  errors: FieldErrors<GardenResult>;
};

export default function SelectCategory({ register, errors }: Props) {
  return (
    <label className="flex flex-col gap-1">
      <p className="font-bold">Item Category</p>

      <select
        {...register("itemCategory")}
        className="border-2 border-zinc-500 bg-white p-2"
        defaultValue=""
      >
        <option value="" disabled>
          Select a category
        </option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {errors.itemCategory && (
        <p className="text-sm text-red-600">{errors.itemCategory.message}</p>
      )}
    </label>
  );
}
