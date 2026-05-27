"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { seeds } from "@/types/seeds";
import { useState } from "react";

const schema = z.object({
  seed: z.string(),
  item: z.string(),
});
type FormFields = z.infer<typeof schema>;

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
    },
    resolver: zodResolver(schema),
  });

  //submit function
  const [currentSeed, setCurrentSeed] = useState<string>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {seeds.map((seed) => {
          return (
            <label key={seed.name} className="cursor-pointer">
              <Image
                src={seed.path}
                alt={seed.name}
                height={75}
                width={75}
              ></Image>{" "}
              <input
                {...register("seed")}
                type="radio"
                value={seed.name}
                onChange={() => setCurrentSeed(seed.name)}
              ></input>
            </label>
          );
        })}
      </div>
      <p>{currentSeed ? currentSeed : ""}</p>
      <div className="flex flex-row justify-start">
        <p className="font-bold">What item did you get?</p>
        <input
          {...register("item")}
          type="text"
          className="mx-0 border-2 border-zinc-500 bg-white md:mx-2"
        ></input>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto w-sm cursor-pointer bg-amber-500 p-2 text-black"
      >
        Submit
      </button>
    </form>
  );
}
