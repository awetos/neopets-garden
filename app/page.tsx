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
          Hello! This site is being developed with a NextJS/TailwindCSS to
          static export (html/js/css) pipeline with a NoSQL backend. Hopefully
          in the future I can make a database for A crowd sourced database for
          results of the gardening on Neopets-Classic.
        </div>
        <div></div>
        <div className="w-full border-amber-300 bg-amber-300 text-center font-bold">
          Submit your result
        </div>
        <div className="w-full border-amber-300 bg-amber-300">
          {" "}
          Latest Submissions...
        </div>
      </div>
    </>
  );
}
