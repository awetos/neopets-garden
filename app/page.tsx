import Image from "next/image";
import classes from "./homepage.module.css";
import Link from "next/link";
import { seeds } from "@/types/seeds";
import SubmissionForm from "@/components/submission-form/submission-form";

export default function Home() {
  return (
    <>
      <div>
        <div className="flex w-full flex-col">
          <p></p> Hello! This site is being developed with a NextJS/TailwindCSS
          to static export (html/js/css) pipeline with a Firebase Free-tier
          NoSQL backend. Hopefully in the future I can make a database for A
          crowd sourced database for results of the gardening on
          Neopets-Classic.
          <p>
            This project is purely for fun, for practicing backend stuff, and
            for curiousity. I am aware that modifiers like fertilizer use, rare
            item buffs, harvest time, and the use of fragment charms are not
            tracked among any other variables that might affect the outcomes.
          </p>
        </div>
        <div className="w-full bg-amber-200 text-center font-bold">
          Submit your result
          <div className="mx-2 my-2 border-b-2 border-amber-500"></div>
          <SubmissionForm></SubmissionForm>
        </div>
        <div className="my-4 w-full bg-amber-200">Latest Submissions...</div>
      </div>
    </>
  );
}
