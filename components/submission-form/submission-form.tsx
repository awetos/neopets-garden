"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { seeds } from "@/types/seeds";
import { useState } from "react";
import classes from "@/components/submission-form/submission-form.module.css";
import { categories, seedNames } from "@/types/garden-result";

const schema = z.object({
  seed: z.enum(seedNames, "You must select a seed"),
  item: z.string().min(3, "Item name cannot be empty"),
  category: z.enum(categories, "Not a valid type"),
  fragment: z.enum(["true", "false"]),
});
type FormFields = z.input<typeof schema>;

export default function SubmissionForm() {
  //handleSubmit comes from form and prevents default
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    defaultValues: {
      seed: "",
      item: "",
      category: undefined,
    },
    resolver: zodResolver(schema),
  });

  //submit function
  const [currentSeed, setCurrentSeed] = useState<string>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("SUBMIT START", data);
    const result = schema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
      setError("root", { message: "Invalid data structure" });
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("SUBMIT END");
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
                value={seed.name}
                onChange={() => {
                  setCurrentSeed(seed.name);
                  setError("seed", { message: "" });
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
            className="mx-0 border-2 border-zinc-500 bg-white px-2 font-normal md:mx-2"
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
                  onChange={() => {
                    setError("category", { message: "" });
                  }}
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
                type="radio"
                {...register("fragment")}
                value={"true"}
              ></input>
              <p>yes</p>
            </label>
            <label className="flex cursor-pointer flex-row gap-2">
              <input
                type="radio"
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
      {errors.root?.message && (
        <div className="text-sm font-normal text-red-500">
          {errors.root.message}
        </div>
      )}
    </form>
  );
}
