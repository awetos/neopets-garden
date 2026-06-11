import classes from "@/components/layout/navbar.module.css";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="gap-medium flex min-h-16 w-full flex-row flex-wrap items-end justify-center border-b-2 border-b-black bg-amber-300">
      <Link href={"/"}>
        <div className={classes["navbutton"]}>Home / Submit</div>
      </Link>
      <Link href={"/database"}>
        <div className={classes["navbutton"]}>Search</div>
      </Link>
      <Link href={"/stats"}>
        <div className={classes["navbutton"]}>Stats</div>
      </Link>
      <Link href={"/fertilizer"}>
        <div className={classes["navbutton"]}>How To Get Fertilizer</div>
      </Link>
    </div>
  );
}
