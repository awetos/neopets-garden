import Heading from "@/components/about/heading";

export default function Recipes() {
  return (
    <div>
      <Heading title="Recipe" />
      <div className="flex flex-row items-center justify-center">
        <img src="/images/fertilizer/cookingpotkeeper.gif"></img>
      </div>
      <table className="w-full px-2">
        <colgroup>
          <col className="w-1/8" />
          <col className="w-7/8" />
        </colgroup>
        <tbody>
          <tr className="border-y-2 border-amber-300">
            <td className="bg-amber-200 text-center">Step 1</td>
            <td className="text-center">
              Go to the <b>Cooking Pot</b> on Mystery Island. Combine{" "}
              <b>Pile of Dung</b> with
              <b> Fish</b> to get<b> Basic Compost</b>
              <br></br>
              --or--
              <br></br>
              Combine <b>Pile of Dung</b> with
              <b> Bone</b> to get<b> Basic Compost</b>
            </td>
          </tr>
          <tr className="border-y-2 border-amber-300">
            <td className="bg-amber-200 text-center">Step 2</td>
            <td className="text-center">
              Combine <b>Basic Compost</b> with
              <b> Berry</b> to get
              <b> Basic Fertilizer </b>
              <br></br>
              --or--
              <br></br>
              Combine <b>Basic Compost</b> with
              <b>Seed</b> to get
              <b> Basic Fertilizer</b>
            </td>
          </tr>
          <tr className="border-y-2 border-amber-300">
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
