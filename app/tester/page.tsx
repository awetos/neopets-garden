"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { seeds } from "@/types/seeds";
import { useEffect, useState } from "react";
import classes from "@/components/submission-form/submission-form.module.css";
import { categories, seedNames } from "@/types/garden-result";
import { uploadToFirebase } from "@/firebase/upload/upload-submission";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import z from "zod";
import { GardenSubmission } from "@/types/garden-submission";
import { randomItemNames } from "./test-functions/randomItemNames";

export const ItemTestSubmissionSchema = z.object({
  iterations: z.coerce
    .number()
    .int("Must be a whole number")
    .min(1, "Must be greater than 0"),
});

export type ItemTestSubmissionForm = z.input<typeof ItemTestSubmissionSchema>;

//define a form
export default function Tester() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<ItemTestSubmissionForm>({
    defaultValues: {
      iterations: 0,
    },
    resolver: zodResolver(ItemTestSubmissionSchema),
  });
  const [hasSubmitted, setHasSubmitted] = useState<true | false>(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitTotal, setSubmitTotal] = useState(0);
  const [submitMessage, setSubmitMessage] = useState("");
  const router = useRouter();
  //in handle submit, for every iteration, send a random gardenresult to firebase.
  const onSubmit: SubmitHandler<ItemTestSubmissionForm> = async (data) => {
    const parsed = ItemTestSubmissionSchema.safeParse(data);

    if (!parsed.success) {
      setError("root", { message: "Invalid data structure" });
      return;
    }

    try {
      //for each count in iterations, create a random data.
      //const newRandomSubmission = GetRandomGardenSubmission();
      //const response = await uploadToFirebase(validData);
      const iterations = parsed.data.iterations;

      setHasSubmitted(false);
      setSubmitProgress(0);
      setSubmitTotal(iterations);
      setSubmitMessage(`Starting 0/${iterations} submissions...`);

      for (let i = 0; i < iterations; i++) {
        const newRandomSubmission = GetRandomGardenSubmission();

        await uploadToFirebase(newRandomSubmission);
        await new Promise((resolve) => setTimeout(resolve, 5));

        const completed = i + 1;
        setSubmitProgress(completed);
        setSubmitMessage(
          `${completed} ${completed === 1 ? "submission" : "submissions"} succeeded...`,
        );
      }

      setSubmitMessage(
        `Submission successful! Submitted ${iterations} random garden submissions!`,
      );
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
      iterations: 0,
    });
    setHasSubmitted(true);
    router.push(`/tester?refresh=${Date.now()}`);
  };
  return (
    <div className="w-full">
      <div className="text-small text-zinc-500">
        On this page, we will test: <br />
        1. Maximum submits and reads, the error or fallback displayed by
        exceeding the quota. <br />
        2. Loading screen.
        <br />
        It will submit a random amount of writes of a random garden result to
        the database.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-amber-200">
        <div className="flex flex-row items-center justify-center">
          <input
            {...register("iterations")}
            autoComplete="off"
            type="text"
            className="mx-0 border-2 border-zinc-500 bg-white px-2 font-normal disabled:bg-zinc-200 disabled:text-gray-600 md:mx-2"
            disabled={isSubmitting}
          ></input>
          <button
            type="submit"
            className="bg-amber-400 px-5 py-2 hover:cursor-pointer hover:bg-amber-600"
          >
            Submit
          </button>
        </div>

        <div className="flex w-full flex-col text-center">
          {errors.root?.message && (
            <div className="text-sm font-normal text-red-500">
              {errors.root.message}
            </div>
          )}
          {submitMessage && (
            <p className="font-normal text-green-800">{submitMessage}</p>
          )}
          {isSubmitSuccessful && hasSubmitted && (
            <p className="font-normal text-green-800">Submission successful!</p>
          )}
        </div>
      </form>
    </div>
  );
}

//returns a random category in categories
function getRandomCategory(): (typeof categories)[number] {
  return categories[Math.floor(Math.random() * categories.length)];
}
//gets a random seed in seeds
function getRandomSeed(): (typeof seedNames)[number] {
  return seedNames[Math.floor(Math.random() * seedNames.length)];
}

function getRandomItem(): string {
  return randomItemNames[Math.floor(Math.random() * randomItemNames.length)];
}

//can only return strings "true" or "false"
//returns false 90% of the time
function getRandomFragment(): "true" | "false" {
  return Math.random() < 0.1 ? "true" : "false";
}

function GetRandomGardenSubmission(): GardenSubmission {
  const randomResult: GardenSubmission = {
    seed: getRandomSeed(),
    item: getRandomItem(),
    category: getRandomCategory(),
    fragment: getRandomFragment(),
    modifiers: [],
    fragmentCharm: "",
  };
  return randomResult;
}
