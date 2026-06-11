import Heading from "@/components/about/heading";

export default function MagicalVial() {
  return (
    <>
      <Heading title="Where to get Magic Vial?" />
      <div>
        <div className="flex flex-row items-baseline justify-center">
          <img src="/images/fertilizer/Kauvara.gif"></img>
          <img src="/images/fertilizer/magic_magicvial.gif"></img>
        </div>
        <p>
          You can get magic vial's from Kauvara's Magic Shop. They are fairly
          common and will drop about every 2nd or 3rd restock.
        </p>
      </div>
    </>
  );
}
