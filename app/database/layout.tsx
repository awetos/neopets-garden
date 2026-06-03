export default function DatabaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>I'm the layout! {children}</div>;
}
