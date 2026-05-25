import classes from "@/components/layout/navbar.module.css";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="gap-medium flex min-h-16 w-full flex-row flex-wrap items-end justify-center border border-white border-b-amber-500 bg-amber-400">
      <div className={classes["navbutton"]}>
        <Link href={"/"}>Home / Submit</Link>
      </div>
      <div className={classes["navbutton"]}>
        <Link href={"/database"}>Search</Link>
      </div>
      <div className={classes["navbutton"]}>
        <Link href={"/stats"}>Stats</Link>
      </div>
    </div>
  );
}
