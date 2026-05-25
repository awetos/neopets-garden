import classes from "@/app/homepage.module.css";

export default function () {
  const currentDate: string = Date.now().toLocaleString();
  const date = new Date();
  const datestr = date.toISOString();
  const tomorrow = date.setDate(date.getDate() + 1);
  const tomorrowstr = date.toISOString();
  return (
    <>
      <div className={classes["colorful-div"]}></div>
      <div>
        {" "}
        I'm on a page, and a function has ran. Today is: {datestr}. Tomorrow
        will be {tomorrowstr}; On this page you should be able to sort by seed
        type, sort by most commonly dropped, and filter out (gardening / food /
        paint brushes / other)
      </div>
    </>
  );
}
