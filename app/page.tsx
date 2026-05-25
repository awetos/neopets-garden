import Image from "next/image";
import classes from "./homepage.module.css";
import Link from "next/link";
import { seeds } from "@/types/seeds";

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
        <div className="flex w-full max-w-3xl flex-row flex-wrap justify-center">
          {seeds.map((seed) => {
            return (
              <div key={seed.name}>
                <Image
                  src={seed.path}
                  alt={seed.name}
                  height={75}
                  width={75}
                ></Image>
              </div>
            );
          })}
        </div>
        <div className="w-full border-amber-300 bg-amber-600">
          {" "}
          Latest Submissions...
        </div>
      </div>
    </>
  );
}
