"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { seeds } from "@/types/seeds";
import { useState } from "react";
import classes from "@/components/submission-form/submission-form.module.css";
import { categories, seedNames } from "@/types/garden-result";
import { uploadToFirebase } from "@/firebase/upload-submission";
import { FirebaseError } from "firebase/app";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";

import { useRouter } from "next/navigation";

const GardenSubmissionSchema = z.object({
  seed: z.enum(seedNames, "You must select a seed"),
  item: z
    .string()
    .min(3, "Item name cannot be empty and should be at least 3 characters"),
  category: z.enum(categories, "Not a valid type"),
  fragment: z.enum(["true", "false"]),
});
export type GardenSubmission = z.input<typeof GardenSubmissionSchema>;

export default function SubmissionForm() {
  const router = useRouter();
  //handleSubmit comes from form and prevents default
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<GardenSubmission>({
    defaultValues: {
      seed: undefined,
      item: "",
      category: undefined,
    },
    resolver: zodResolver(GardenSubmissionSchema),
  });

  //reset the success message whenever a new seed is selected.
  //I don't care about changing the other values because it will mess with the zod validation which is called onChange.
  const updateSuccessMessage = () => {
    setHasSubmitted(false);
  };

  //submit function
  const [currentSeed, setCurrentSeed] = useState<string>();
  const [hasSubmitted, setHasSubmitted] = useState<true | false>(false);
  const onSubmit: SubmitHandler<GardenSubmission> = async (data) => {
    console.log("SUBMIT START", data);
    const result = GardenSubmissionSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
      setError("root", { message: "Invalid data structure" });
      return;
    }
    try {
      await uploadToFirebase(data);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "Something went wrong with submission." });
      }
    }

    setHasSubmitted(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    reset();
    router.push(`/?refresh=${Date.now()}`);
  };
  return (
    <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit(onSubmit)}>
      <div className={classes["seeds-list"]}>
        {seeds.map((seed) => {
          return (
            <label key={seed.name} className={`cursor-pointer`}>
              <Image
                src={seed.path}
                alt={seed.name}
                height={75}
                width={75}
                className={classes["seed-label"]}
              ></Image>{" "}
              <input
                {...register("seed")}
                type="radio"
                disabled={isSubmitting}
                value={seed.name}
                onChange={() => {
                  setCurrentSeed(seed.name);
                  setError("seed", { message: "" });
                  updateSuccessMessage();
                }}
              ></input>
            </label>
          );
        })}
      </div>
      {errors.seed?.message && (
        <div className="text-sm font-normal text-red-500">
          {errors.seed.message}
        </div>
      )}
      <p>{currentSeed ? currentSeed : ""}</p>
      <div className="flex flex-col">
        <div className="mx-auto flex flex-row justify-start">
          <p className="font-bold">What item did you get?</p>
          <input
            {...register("item")}
            autoComplete="off"
            type="text"
            className="mx-0 border-2 border-zinc-500 bg-white px-2 font-normal disabled:bg-zinc-200 disabled:text-gray-600 md:mx-2"
            disabled={isSubmitting}
          ></input>
        </div>
        {errors.item?.message && (
          <div className="text-sm font-normal text-red-500">
            {errors.item.message}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-2">
          <p>Choose your category: </p>
          {categories.map((category) => {
            return (
              <label
                className="flex cursor-pointer flex-row align-middle"
                key={category}
              >
                <input
                  {...register("category")}
                  type="radio"
                  value={category}
                  disabled={isSubmitting}
                ></input>
                {category}
              </label>
            );
          })}
        </div>
        {errors.category?.message && (
          <div className="text-sm font-normal text-red-500">
            {errors.category.message}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="mx-auto flex w-full flex-col flex-wrap border-t-2 border-b-2 border-t-amber-200 border-b-amber-200 md:flex-row">
          <div className="flex flex-1 flex-col items-center">
            {" "}
            <p>Did you get a fragment?</p>
            <Image
              src="/images/pet_token_fragment_A-1.png"
              width={100}
              height={100}
              alt="Image of a fragment"
            ></Image>
          </div>
          <div className="flex flex-1 flex-row flex-wrap items-center justify-evenly">
            <label className="flex cursor-pointer flex-row gap-2">
              <input
                disabled={isSubmitting}
                type="radio"
                {...register("fragment")}
                value={"true"}
              ></input>
              <p>yes</p>
            </label>
            <label className="flex cursor-pointer flex-row gap-2">
              <input
                type="radio"
                disabled={isSubmitting}
                {...register("fragment")}
                value={"false"}
              ></input>
              <p>no</p>
            </label>
          </div>
        </div>
        {errors.fragment?.message && (
          <div className="text-sm font-normal text-red-500">
            {errors.fragment.message}
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto w-sm max-w-full cursor-pointer bg-amber-500 p-2 text-black active:scale-95 active:shadow-sm disabled:cursor-auto disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <div className="flex w-full flex-col">
        {errors.root?.message && (
          <div className="text-sm font-normal text-red-500">
            {errors.root.message}
          </div>
        )}
        {isSubmitSuccessful && hasSubmitted && (
          <p className="font-normal text-green-800"> Submission successful!</p>
        )}
      </div>
    </form>
  );
}
