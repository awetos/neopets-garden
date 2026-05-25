import { GardenResult } from "@/types/garden-result";
import { FieldErrors } from "react-hook-form";
import { seeds } from "@/types/seeds";
import Image from "next/image";

type Props = {
  selectedSeed: string | undefined;
  setSelectedSeed: (seed: string | "") => void;
  errors: FieldErrors<GardenResult>;
};

export default function SelectSeed({
  selectedSeed,
  setSelectedSeed,
  errors,
}: Props) {
  return (
    <div>
      <div className="mx-auto grid w-full grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-center gap-4">
        {seeds.map((seed) => {
          return (
            <div
              className="flex flex-1 cursor-pointer flex-col items-center justify-baseline sm:p-0 md:p-4"
              key={seed.name}
            >
              <label>
                <Image
                  src={seed.path}
                  alt={seed.name}
                  height={75}
                  width={75}
                  className="mx-auto cursor-pointer"
                ></Image>
                <p className="w-full cursor-pointer text-center">{seed.name}</p>
                <input
                  className="w-full cursor-pointer bg-amber-400"
                  type="radio"
                  name="seed"
                  value={seed.name}
                  checked={selectedSeed === seed.name}
                  onChange={() => {
                    setSelectedSeed(seed.name);
                  }}
                />
              </label>
            </div>
          );
        })}
      </div>
      <div className="w-full">
        {errors.seed && (
          <p className="text-sm text-red-600">{errors.seed.message}</p>
        )}
      </div>
    </div>
  );
}
