import { SeedStat } from "@/types/garden-result";

export default function SeedCard(currentSeed: SeedStat) {
  return (
    <div className="bg-amber-100">
      {currentSeed.seed}{" "}
      {currentSeed.stats.fragment && `${currentSeed.stats.fragment}`}
    </div>
  );
}
