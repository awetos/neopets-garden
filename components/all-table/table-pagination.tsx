"use client";

import Link from "next/link";

type TablePaginationProps = {
  currentPage: number;
  hasNext: true | false;
  hasPrevious: true | false;
  goNext: () => void;
  goPrev: () => void;
};
//if hasNext is true, render next on the far right.
//if hasPrevious is true, render previous on the far left.
//if both are true, render both buttons
export default function TablePagination({
  currentPage,
  hasNext,
  hasPrevious,
  goNext,
  goPrev,
}: TablePaginationProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex-1">
        {hasNext && !hasPrevious && hasNextOnly(goNext)}
        {!hasNext && hasPrevious && hasPrevOnly(currentPage, goPrev)}
        {hasNext &&
          hasPrevious &&
          hasBothNextAndPrev(currentPage, goPrev, goNext)}
      </div>
      <div className="flex-1">
        <div className="text-center text-xs text-zinc-500 hover:underline">
          <Link href="/about">Why can't I see # of results or pages?</Link>
          {/*Links to page explaining cost and design decision*/}
        </div>
      </div>
    </div>
  );
}

function hasNextOnly(goNext: () => void) {
  return (
    <div className="flex flex-row justify-evenly">
      <div className="flex-1 px-5 py-2"></div>
      <div className="flex-1 px-5 py-2 text-center md:flex-3">Page 1</div>
      <div
        className="flex-1 bg-amber-400 px-5 py-2 text-center hover:cursor-pointer"
        onClick={() => goNext()}
      >
        Next
      </div>
    </div>
  );
}
function hasPrevOnly(currentPage: number, goPrev: () => void) {
  return (
    <div className="flex flex-row justify-evenly">
      <div
        className="flex-1 bg-amber-400 px-5 py-2 text-center hover:cursor-pointer"
        onClick={() => goPrev()}
      >
        Prev
      </div>
      <div className="flex-1 px-5 py-2 text-center md:flex-3">
        Page {currentPage + 1}
      </div>
      <div className="flex-1 px-5 py-2 text-center"></div>
    </div>
  );
}
function hasBothNextAndPrev(
  currentPage: number,
  goPrev: () => void,
  goNext: () => void,
) {
  return (
    <div className="flex flex-row justify-evenly">
      <div
        className="flex-1 bg-amber-400 px-5 py-2 text-center hover:cursor-pointer"
        onClick={() => goPrev()}
      >
        Prev
      </div>
      <div className="flex-1 px-5 py-2 text-center md:flex-3">
        Page {currentPage + 1}
      </div>
      <div
        className="flex-1 bg-amber-400 px-5 py-2 text-center hover:cursor-pointer"
        onClick={() => goNext()}
      >
        Next
      </div>
    </div>
  );
}
