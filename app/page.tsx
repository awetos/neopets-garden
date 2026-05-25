import Image from "next/image";
import classes from "./homepage.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <div className="flex flex-col w-full">
          Hello! This site is being developed with a NextJS/TailwindCSS to
          static export (html/js/css) pipeline. Hopefully in the future I can
          make a database for A crowd sourced database for results of the
          gardening on Neopets-Classic.{" "}
        </div>
        <div className="flex flex-row">
          <div className={classes["test-div"]}>This is an export test.</div>
          <div className={classes["colorful-div"]}>
            This one uses css variables
          </div>
          <Link href={"database"}>Check out our database!</Link>
        </div>
      </div>
    </>
  );
}
