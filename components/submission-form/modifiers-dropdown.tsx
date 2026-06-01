"use client";
import { GardenSubmission } from "@/types/garden-submission";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { FieldErrors } from "react-hook-form";
export const saveModifiersToLocal = (modifiers: string[]) => {
  localStorage.setItem("garden-modifiers", JSON.stringify(modifiers));
};

export const loadModifiersFromLocal = (): string[] => {
  const stored = localStorage.getItem("garden-modifiers");

  if (!stored) {
    return ["", "", ""];
  }

  return JSON.parse(stored);
};
type ModifiersInputProps = {
  register: UseFormRegister<GardenSubmission>;
  isSubmitting: boolean;
  errors: FieldErrors<GardenSubmission>;
};

export function ModifiersDropdown({
  register,
  isSubmitting,
  errors,
}: ModifiersInputProps) {
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      <div
        className="bg-amber-400"
        onClick={() => {
          if (showDropdown) {
            setShowDropdown(false);
          } else {
            setShowDropdown(true);
          }
        }}
      >
        <span className="flex flex-row pl-5">
          <p>Add Modifiers? (Optional)</p>
          {showDropdown ? <ChevronDown /> : <ChevronUp />}
        </span>
      </div>
      {showDropdown && (
        <div className="flex flex-col bg-amber-500/50">
          <div className="flex flex-col py-2 md:flex-row">
            <div className="flex-1 flex-col">
              <input
                autoComplete="off"
                type="text"
                className="mx-0 border-2 border-zinc-500 bg-white px-2 font-normal disabled:bg-zinc-200 disabled:text-gray-600 md:mx-2"
                disabled={isSubmitting}
                {...register("modifiers.0")}
              />
              <div className="w-full text-center text-sm font-normal text-red-500">
                {errors.modifiers?.[0]?.message}
              </div>
            </div>
            <div className="flex-1 flex-col">
              <input
                autoComplete="off"
                type="text"
                className="mx-0 border-2 border-zinc-500 bg-white px-2 font-normal disabled:bg-zinc-200 disabled:text-gray-600 md:mx-2"
                disabled={isSubmitting}
                {...register("modifiers.1")}
              />{" "}
              <div className="w-full text-center text-sm font-normal text-red-500">
                {errors.modifiers?.[1]?.message}
              </div>
            </div>
            <div className="flex-1 flex-col">
              <input
                autoComplete="off"
                type="text"
                className="mx-0 border-2 border-zinc-500 bg-white px-2 font-normal disabled:bg-zinc-200 disabled:text-gray-600 md:mx-2"
                disabled={isSubmitting}
                {...register("modifiers.2")}
              />
              <div className="w-full text-center text-sm font-normal text-red-500">
                {errors.modifiers?.[2]?.message}
              </div>
            </div>
          </div>
          <div className="w-full text-center text-sm font-normal text-red-500">
            {errors.modifiers?.message ? errors.modifiers.message : ""}
          </div>
        </div>
      )}
    </div>
  );
}
