import Heading from "@/components/about/heading";

export default function AboutFertilizer() {
  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        <img src="/images/fertilizer/compost.gif"></img>
        <img src="/images/fertilizer/item_fertilizer_deluxe.gif"></img>
        <img src="/images/fertilizer/item_fertilizer_magical.gif"></img>
      </div>
      <div>
        If you use fertilizers such as <b>Basic Compost</b>,
        <b>Basic Fertilizer</b>, or <b>Miracle Food</b> your plants can grow
        faster or even instantly - skipping any need to water them or prevent
        diseases.
      </div>
      <Heading title="Recipe" />
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
          <b className="text-olive-500">Seed</b> to get
          <b> Basic Fertilizer</b>
        </li>
        <li>
          Combing <b>Basic Fertilizer</b> with <b>Magic Vial</b> to get
          <b> Miracle Food </b>
        </li>
      </ol>
      <div className="space-y-2">
        <div className="my-5"></div>
        <p>
          <b className="text-amber-500">Dung </b> can be replaced by most items
          with dung in it, like <b>Dung Pizza</b>, <b>Chewing Dung</b>, or{" "}
          <b>Dung Slushie</b>
        </p>
        <p>
          <b className="text-sky-500">Fish</b> can be most fish hauled up from
          fishing, including <b>Fish Puddle</b> and <b>Scarf Squid</b>. But some
          fish cannot be used, such as <b>Doomfish</b>.
        </p>
        <p>
          <b className="text-yellow-800"> Bone</b> can be used to substitute the
          fish, such as <b>Muddy Bone</b>, <b>UFFH</b> or <b>Petrified Bone</b>
        </p>
        <p>
          <b className="text-pink-500">Berry</b> can be most berries, such as
          <b> Conkerberry </b> or <b>Loveberry</b>. Certain berries cannot be
          used, such as <b>Rotten Berry</b> or <b>Half-eaten Berry</b>
        </p>
        <p>
          <b className="text-olive-500">Seed</b> can be any seed except
          <b> Maraquan seed</b>
        </p>
      </div>
      <Heading title="Where to get Dung?" />
      <div>
        <div className="flex flex-row items-center justify-center">
          <img src="/images/fertilizer/rubbishdumpkeeper.gif"></img>
        </div>
        <p>
          You can get dung at The Meridell Rubbish Dump for up to 10 pieces a
          day. Sometimes while Berry Picking you may come accross some dung as
          well.
        </p>
        <p>
          Dung drops randomly throughout the day in batches, so if you see dung
          in the Rubbish Dump, grab it, and refresh to see if there are any
          more. I've gotten 8 dung at once before.
        </p>
      </div>
    </div>
  );
}
