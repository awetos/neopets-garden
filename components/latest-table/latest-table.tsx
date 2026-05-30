import { getLatestSubmissions } from "@/firebase/get-latest-submissions";
import { formatDistanceStrict } from "date-fns";

const { formatDistance } = require("date-fns");

//on mobile screens, render an ordered list.
//on desktop screens, render a table

export default async function LatestTable() {
  const latestData = await getLatestSubmissions();
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
          {latestData.length < 1 && (
            <tr>
              <td colSpan={3} className="py-2 text-center">
                There are no submissions
              </td>
            </tr>
          )}
          {latestData.map((data, index) => {
            return (
              <tr key={index}>
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
