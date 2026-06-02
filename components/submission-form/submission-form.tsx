"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { seeds } from "@/types/seeds";
import { useEffect, useState } from "react";
import classes from "@/components/submission-form/submission-form.module.css";
import { categories } from "@/types/garden-result";
import { uploadToFirebase } from "@/firebase/upload-submission";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import {
  loadFragmentCharmFromLocal,
  ModifiersDropdown,
  saveFragmentCharmToLocal,
} from "./modifiers-dropdown";
import { GardenSubmission } from "@/types/garden-submission";
import { GardenSubmissionSchema } from "@/types/garden-submission";
import {
  loadModifiersFromLocal,
  saveModifiersToLocal,
} from "./modifiers-dropdown";

export default function SubmissionForm() {
  const router = useRouter();
  //handleSubmit comes from form and prevents default
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<GardenSubmission>({
    defaultValues: {
      seed: undefined,
      item: "",
      category: undefined,
      modifiers: [],
      fragment: undefined,
      fragmentCharm: "",
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
  const [hasLoadedModifiers, setHasLoadedModifiers] = useState(false);

  //we must use a UseEffect because the default values were defined before mount so it may  not be able to read local storage yet.
  useEffect(() => {
    const modifiers = loadModifiersFromLocal();
    const fragmentCharm = loadFragmentCharmFromLocal();
    modifiers.forEach((modifier, index) => {
      setValue(`modifiers.${index}` as const, modifier);
    });

    setValue("fragmentCharm", fragmentCharm);
    setHasLoadedModifiers(true);
    //anytime the user changes the value now, we will save to local storage.
  }, [setValue]);

  const modifiers = watch("modifiers");
  const fragmentCharm = watch("fragmentCharm");

  //Once the modifiers have loaded (hasLoadedModifiers), we should save them instead of accidentally saving [] from default values.
  useEffect(() => {
    if (!hasLoadedModifiers) return;
    saveModifiersToLocal(modifiers ?? []);
    saveFragmentCharmToLocal(fragmentCharm ?? "");
  }, [modifiers, fragmentCharm, hasLoadedModifiers]);

  const onSubmit: SubmitHandler<GardenSubmission> = async (data) => {
    console.log("SUBMIT START", data);
    const result = GardenSubmissionSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
      setError("root", { message: "Invalid data structure" });
      return;
    }
    try {
      const response = await uploadToFirebase(data);

      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError("root", { message: error.message });
      } else {
        setError("root", {
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
      return;
    }
    reset({
      seed: "",
      item: "",
      category: "",
      fragment: undefined,
      modifiers: data.modifiers,
      fragmentCharm: data.fragmentCharm,
    });
    setCurrentSeed(undefined);
    setHasSubmitted(true);
    router.push(`/?refresh=${Date.now()}`);
  };
  return (
    <form
      className="flex flex-col gap-4 p-2 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={classes["seeds-list"]}>
        {seeds.map((uniqueSeed) => {
          return (
            <label key={uniqueSeed.name} className={`cursor-pointer`}>
              <Image
                src={uniqueSeed.path}
                alt={uniqueSeed.name}
                height={75}
                width={75}
                className={classes["seed-label"]}
              ></Image>{" "}
              <input
                {...register("seed")}
                type="radio"
                disabled={isSubmitting}
                value={uniqueSeed.name}
                onChange={() => {
                  setCurrentSeed(uniqueSeed.name);
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
          {categories.map((eachCategory) => {
            return (
              <label
                className="flex cursor-pointer flex-row align-middle"
                key={eachCategory}
              >
                <input
                  {...register("category")}
                  type="radio"
                  value={eachCategory}
                  disabled={isSubmitting}
                ></input>
                {eachCategory}
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
      </div>{" "}
      <ModifiersDropdown
        register={register}
        isSubmitting={isSubmitting}
        errors={errors}
        setValue={setValue}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto w-full max-w-sm cursor-pointer bg-amber-500 p-2 text-black active:scale-95 active:shadow-sm disabled:cursor-auto disabled:opacity-50"
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
