import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex min-h-16 w-full flex-row flex-wrap items-center justify-end gap-5 border-t-amber-500 bg-amber-400 px-5">
      <Link href="/about">
        <div className="text-amber-600 hover:cursor-pointer hover:underline">
          About
        </div>
      </Link>
      <Link href="/contact">
        <div className="text-amber-600 hover:cursor-pointer hover:underline">
          Contact
        </div>
      </Link>
    </div>
  );
}
