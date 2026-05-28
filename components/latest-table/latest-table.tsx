import { seedNames } from "@/types/garden-result";

type TableEntry = {
  seed: string;
  item: string;
  timestamp: string;
};

function getRandomSeed() {
  return seedNames[Math.floor(Math.random() * seedNames.length)];
}

function getRandomRecentDate() {
  const now = new Date();

  // random amount of time within last 3 days
  const randomOffset = Math.floor(Math.random() * 3 * 24 * 60 * 60 * 1000);

  const randomDate = new Date(now.getTime() - randomOffset);

  return (
    randomDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " " +
    randomDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  );
}
export function generateSampleData(count: number): TableEntry[] {
  return Array.from({ length: count }, (_, index) => ({
    seed: getRandomSeed(),
    item: "item name",
    timestamp: getRandomRecentDate(),
  }));
}
//on mobile screens, render an ordered list.
//on desktop screens, render a table

export default function LatestTable() {
  const sampleData = generateSampleData(7);
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="w-fit">Seed</th>
            <th>Item</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.seed}</td>
                <td>{data.item}</td>
                <td>{data.timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
