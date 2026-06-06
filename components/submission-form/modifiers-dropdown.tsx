"use client";
import { GardenSubmissionForm } from "@/types/garden-submission";
import { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { FieldErrors } from "react-hook-form";
export const saveModifiersToLocal = (modifiers: string[]) => {
  //we must guard against calling this function if it's not in the browser or else it won't  build
  if (typeof window === "undefined") return;
  localStorage.setItem("garden-modifiers", JSON.stringify(modifiers));
};

export const loadModifiersFromLocal = (): string[] => {
  //we must guard against calling this function if it's not in the browser or else it won't  build

  if (typeof window === "undefined") {
    return ["", "", ""];
  }

  try {
    const stored = localStorage.getItem("garden-modifiers");

    if (!stored) {
      return ["", "", ""];
    }

    return JSON.parse(stored);
  } catch {
    return ["", "", ""];
  }
};
export const saveFragmentCharmToLocal = (
  fragmentCharm: "true" | "false" | "",
) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("garden-fragment-charm", fragmentCharm);
};

export const loadFragmentCharmFromLocal = (): "true" | "false" | "" => {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const stored = localStorage.getItem("garden-fragment-charm");

    if (stored === "true" || stored === "false" || stored === "") {
      return stored;
    }

    return "";
  } catch {
    return "";
  }
};
type ModifiersInputProps = {
  register: UseFormRegister<GardenSubmissionForm>;
  isSubmitting: boolean;
  errors: FieldErrors<GardenSubmissionForm>;
  setValue: UseFormSetValue<GardenSubmissionForm>;
};

export function ModifiersDropdown({
  register,
  isSubmitting,
  errors,
  setValue,
}: ModifiersInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <div
        className="flex flex-row justify-between bg-amber-400"
        onClick={() => {
          if (showDropdown) {
            setShowDropdown(false);
          } else {
            setShowDropdown(true);
          }
        }}
      >
        <div className="flex pl-5">
          <p>Add Modifiers? (Optional)</p>
          {showDropdown ? <ChevronUp /> : <ChevronDown />}
        </div>
        <div
          className="flex bg-red-500/20 px-2 font-normal"
          onClick={(e) => {
            e.stopPropagation();
            setValue("modifiers", ["", "", ""]);
            setValue("fragmentCharm", "");
          }}
        >
          <p>[Clear]</p>
        </div>
      </div>

      {showDropdown && (
        <div className="flex flex-col bg-amber-500/50">
          {" "}
          <div className="p-2 text-left text-sm font-normal">
            Modifiers are items added to your Neogarden that may increase rare
            item drop rate. Modifiers are saved on your browser's local storage
            after submit so you do not have to type them every time.
          </div>
          <div className="flex flex-col gap-2 p-2 md:flex-row">
            <div className="flex-1 flex-col">
              <input
                autoComplete="off"
                type="text"
                className="w-[80%] border-2 border-zinc-500 bg-white font-normal disabled:bg-zinc-200 disabled:text-gray-600 md:w-full"
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
                className="w-[80%] border-2 border-zinc-500 bg-white font-normal disabled:bg-zinc-200 disabled:text-gray-600 md:w-full"
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
                className="w-[80%] border-2 border-zinc-500 bg-white font-normal disabled:bg-zinc-200 disabled:text-gray-600 md:w-full"
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
          <div className="flex flex-col">
            <div>
              <p>
                Do you have a fragment charm? (increases odds of getting a
                fragment)
              </p>
            </div>
            <div className="flex flex-row flex-wrap justify-evenly">
              <label className="flex cursor-pointer flex-row gap-2">
                <input
                  type="radio"
                  disabled={isSubmitting}
                  {...register("fragmentCharm")}
                  value={"true"}
                ></input>
                <p className="font-normal">I have a fragment charm</p>
              </label>
              <label className="flex cursor-pointer flex-row gap-2">
                <input
                  type="radio"
                  disabled={isSubmitting}
                  {...register("fragmentCharm")}
                  value={"false"}
                ></input>
                <p className="font-normal">No fragment charm</p>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
