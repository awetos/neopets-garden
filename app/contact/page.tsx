import Link from "next/link";

export default function Contact() {
  return (
    <div>
      <p>
        Enjoying the site? Send me{" "}
        <Link
          href="https://neopetsclassic.com/userlookup/?user=starrelly"
          className="font-bold text-amber-800 hover:underline"
        >
          a gift on Neopets Classic
        </Link>{" "}
        or simply contribute your results to help build the database.
      </p>
      <p>
        Have a feature you'd like or a bug you need to report? Neomail me also
        on Neopets Classic!
      </p>
    </div>
  );
}
