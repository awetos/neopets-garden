import Heading from "@/components/about/heading";

export default function DungInfo() {
  return (
    <>
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
        <div className="flex flex-row items-center justify-center gap-2">
          <img src="/images/fertilizer/food_dung_pizza.gif"></img>
          <img src="/images/fertilizer/gross_chewingdung.png"></img>
          <img src="/images/fertilizer/slush_dung.gif"></img>
          <img src="/images/fertilizer/pile_of_dung.png"></img>
        </div>
      </div>
    </>
  );
}
