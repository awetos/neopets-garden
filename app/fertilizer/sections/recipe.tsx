import Heading from "@/components/about/heading";

export default function Recipes() {
  return (
    <div>
      <Heading title="Recipe" />
      <div className="flex flex-row items-center justify-center">
        <img src="/images/fertilizer/cookingpotkeeper.gif"></img>
      </div>
      <ol className="list-decimal pl-20">
        <li>
          Go to the <b>Cooking Pot</b> on Mystery Island.
        </li>
        <li>
          Combine <b className="text-amber-500">Pile of Dung</b> with
          <b className="text-sky-500"> Fish</b> to get<b> Basic Compost</b>
          <br></br>
          --or--
          <br></br>
          Combine <b className="text-amber-500">Pile of Dung</b> with
          <b className="text-yellow-800"> Bone</b> to get<b> Basic Compost</b>
        </li>
        <li>
          Combine <b>Basic Compost</b> with{" "}
          <b className="text-pink-500">Berry</b> to get
          <b> Basic Fertilizer </b>
          <br></br>
          --or--
          <br></br>
          Combine <b>Basic Compost</b> with{" "}
          <b className="text-lime-500">Seed</b> to get
          <b> Basic Fertilizer</b>
        </li>
        <li>
          Combine <b>Basic Fertilizer</b> with <b>Magic Vial</b> to get
          <b> Miracle Food </b>
        </li>
      </ol>
    </div>
  );
}
