"use client";
import { getLatestSubmissions } from "@/firebase/get-latest-preview";
import { GardenResult } from "@/types/garden-result";
import { formatDistanceStrict } from "date-fns";
import { useEffect, useState } from "react";

const { formatDistance } = require("date-fns");
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

//on mobile screens, render an ordered list.
//on desktop screens, render a table

export default function LatestTable() {
  const router = useRouter();

  const [latestData, setLatestData] = useState<GardenResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const refreshKey = searchParams.get("refresh");

  useEffect(() => {
    async function loadLatestData() {
      const data = await getLatestSubmissions();
      setLatestData(data);
      setIsLoading(false);
    }

    loadLatestData();
  }, [refreshKey]);
  console.log(latestData);
  return (
    <div>
      <table className="w-full">
        <colgroup>
          <col className="w-2/7" />
          <col className="w-4/7" />
          <col className="w-1/7" />
        </colgroup>
        <thead>
          <tr>
            <th>Seed</th>
            <th>Item</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} className="py-2 text-center">
                Loading Submissions...
              </td>
            </tr>
          )}
          {!isLoading && latestData.length < 1 && (
            <tr>
              <td colSpan={3} className="py-2 text-center">
                There are no submissions
              </td>
            </tr>
          )}
          {latestData.map((data, index) => {
            return (
              <tr
                key={index}
                className="hover:cursor-pointer hover:bg-amber-400 hover:font-bold"
                onClick={() => router.push(`/view-seed?id=${data.id}`)}
              >
                <td>{data.seed}</td>
                <td>{data.item}</td>
                <td>
                  {formatDistanceStrict(Date.now(), data.createdAt.toDate())}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
