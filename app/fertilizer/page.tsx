import Heading from "@/components/about/heading";
import Recipes from "./sections/recipe";
import RecipeInfo from "./sections/recipe-info";
import DungInfo from "./sections/dung";
import BerriesInfo from "./sections/berries";
import MagicalVial from "./sections/magicalvial";

export default function AboutFertilizer() {
  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        <img src="/images/fertilizer/compost.gif"></img>
        <img src="/images/fertilizer/item_fertilizer_deluxe.gif"></img>
        <img src="/images/fertilizer/item_fertilizer_magical.gif"></img>
      </div>
      <div>
        If you use fertilizers such as <b> Basic Compost</b>,
        <b>Basic Fertilizer</b>, or <b>Miracle Food</b> your plants can grow
        faster or even instantly - skipping any need to water them or prevent
        diseases.
      </div>
      <div className="my-5"></div>
      <Recipes />
      <div className="my-5"></div>
      <RecipeInfo />
      <div className="my-5"></div>
      <DungInfo />
      <div className="my-5"></div>
      <BerriesInfo />
      <div className="my-5"></div>
      <MagicalVial />
    </div>
  );
}
