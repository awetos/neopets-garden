"use client";

import Link from "next/link";

type TablePaginationProps = {
  hasNext: true | false;
  hasPrevious: true | false;
  goNext: () => void;
  goPrev: () => void;
};
//if hasNext is true, render next on the far right.
//if hasPrevious is true, render previous on the far left.
//if both are true, render both buttons
export default function TablePagination({
  hasNext,
  hasPrevious,
  goNext,
  goPrev,
}: TablePaginationProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex-1">
        {hasNext && !hasPrevious && hasNextOnly(goNext)}
        {!hasNext && hasPrevious && hasPrevOnly(goPrev)}
        {hasNext && hasPrevious && hasBothNextAndPrev(goPrev, goNext)}
      </div>
      <div className="flex-1">
        <div className="text-small text-center text-zinc-500">
          <Link href="/about">Why can't I see # of results or pages?</Link>
          {/*Links to page explaining cost and design decision*/}
        </div>
      </div>
    </div>
  );
}

function hasNextOnly(goNext: () => void) {
  return (
    <div className="flex flex-row justify-end">
      <div
        className="bg-amber-400 px-5 py-2 hover:cursor-pointer"
        onClick={() => goNext()}
      >
        Next
      </div>
    </div>
  );
}
function hasPrevOnly(goPrev: () => void) {
  return (
    <div className="flex flex-row justify-start">
      <div
        className="bg-amber-400 px-5 py-2 hover:cursor-pointer"
        onClick={() => goPrev()}
      >
        Prev
      </div>
    </div>
  );
}
function hasBothNextAndPrev(goPrev: () => void, goNext: () => void) {
  return (
    <div className="flex flex-row justify-between">
      <div
        className="bg-amber-400 px-5 py-2 hover:cursor-pointer"
        onClick={() => goPrev()}
      >
        Prev
      </div>{" "}
      <div
        className="bg-amber-400 px-5 py-2 hover:cursor-pointer"
        onClick={() => goNext()}
      >
        Next
      </div>
    </div>
  );
}
