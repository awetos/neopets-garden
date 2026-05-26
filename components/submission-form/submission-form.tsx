"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { gardenResultSchema, type GardenResult } from "@/types/garden-result";
import SelectSeed from "./seed-selection";
import SelectCategory from "./category-selection";

export default function SubmissionForm() {
  const form = useForm<GardenResult>({
    resolver: zodResolver(gardenResultSchema),

    defaultValues: {
      seed: "",
      item: "",
      itemCategory: undefined,

      fragment: false,
      fertilizerUse: "",
      rareItemBuffRate: 0,
    },
  });

  function onSubmit(values: GardenResult) {
    console.log(values);
    console.log("You submitted, Yay!");
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, (errors) =>
        console.log("errors:", errors),
      )}
    >
      <SelectSeed
        selectedSeed={form.watch("seed")}
        setSelectedSeed={(seed) =>
          form.setValue("seed", seed, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        errors={form.formState.errors}
      />
      <div className="px-auto w-full text-center font-bold">
        {form.getValues("seed")}
      </div>
      <div className="flex w-full flex-col">
        <label>
          <p className="font-bold">What did you get?</p>
          <input
            {...form.register("item")}
            type="text"
            placeholder="eg. Faerie Paint Brush"
            className="p-small border-2 border-zinc-500 bg-white"
          ></input>
        </label>
        {form.formState.errors.item && (
          <p className="text-sm text-red-600">
            {form.formState.errors.item.message}
          </p>
        )}
      </div>

      <button className="cursor-pointer bg-amber-300" type="submit">
        Submit
      </button>
    </form>
  );
}
