import Heading from "@/components/about/heading";

export default function BerriesInfo() {
  return (
    <>
      <Heading title="Where to get Berries?" />
      <div>
        <div className="flex flex-row items-center justify-center">
          <img src="/images/fertilizer/med_berry_farmer.gif"></img>
        </div>
        <p>
          You can pick up to 6 berries a day from the Pick your Own minigame by
          paying the 400np entrance fee.
        </p>
        <p>
          You can buy more berries from other players with the shop wizard. The
          more common berries will be cheaper.
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <img src="/images/fertilizer/berries/med_berry_4.png"></img>
          <img src="/images/fertilizer/berries/med_berry_6.png"></img>
          <img src="/images/fertilizer/berries/med_berry_7.png"></img>
          <img src="/images/fertilizer/berries/med_berry_15.png"></img>
        </div>
        <p>
          Any berry listed in the highscore table can be used except for the
          half-eaten and rotten ones.
        </p>
      </div>
    </>
  );
}
