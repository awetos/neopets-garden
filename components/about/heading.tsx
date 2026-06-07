type HeadingProps = {
  title: string;
};

export default function Heading({ title }: HeadingProps) {
  return (
    <div>
      {" "}
      <div className="pl-5 text-lg font-bold"> {title}</div>
      <div className="mx-5 mb-2 border-b-2 border-amber-500"></div>
    </div>
  );
}
