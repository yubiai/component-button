import dynamic from "next/dynamic";

const HomeChain = dynamic(
  () => {
    return import("../components/home");
  },
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <HomeChain />
    </div>
  );
}
