import Heading from "@/components/about/heading";

export default function Recipes() {
  return (
    <div>
      <Heading title="Recipe" />
      <div className="flex flex-row items-center justify-center py-2">
        <img src="/images/fertilizer/cookingpotkeeper.gif"></img>
      </div>
      <div className="w-full rounded-t-lg bg-amber-200 text-center">
        Go to the <b>Cooking Pot</b> on Mystery Island:
      </div>

      <table className="w-full px-2">
        <colgroup>
          <col className="w-1/8" />
          <col className="w-7/8" />
        </colgroup>
        <tbody>
          <tr className="h-20 border-b-2 border-amber-300">
            <td className="bg-amber-200 text-center">Step 1</td>
            <td className="text-center">
              Combine <b className="text-amber-500">Pile of Dung</b> with
              <b className="text-sky-500"> Fish</b> to get<b> Basic Compost</b>
              <br></br>
              --or--
              <br></br>
              Combine <b>Pile of Dung</b> with
              <b className="text-yellow-800"> Bone</b> to get
              <b> Basic Compost</b>
            </td>
          </tr>
          <tr className="h-20 border-b-2 border-amber-300">
            <td className="bg-amber-200 text-center">Step 2</td>
            <td className="text-center">
              Combine <b>Basic Compost</b> with
              <b className="text-pink-500"> Berry</b> to get
              <b> Basic Fertilizer </b>
              <br></br>
              --or--
              <br></br>
              Combine <b>Basic Compost</b> with
              <b className="text-lime-500"> Seed</b> to get
              <b> Basic Fertilizer</b>
            </td>
          </tr>
          <tr className="h-20">
            <td className="bg-amber-200 text-center">Step 3</td>
            <td className="text-center">
              Combine <b>Basic Fertilizer</b> with <b>Magic Vial</b> to get
              <b> Miracle Food </b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
