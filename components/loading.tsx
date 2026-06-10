import classes from "@/components/loading.module.css";

type LoadingProps = {
  text?: string;
};

export default function Loading({ text }: LoadingProps) {
  return (
    <div className="flex h-20 w-full justify-center text-center">
      <div className={classes["loader"]}>{text ? text : "loading..."}</div>
    </div>
  );
}
