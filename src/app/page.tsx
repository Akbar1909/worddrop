"use client";
import dynamic from "next/dynamic";

const WordDropCanvas = dynamic(() => import("@/components/WordDropCanvas"), {
  ssr: false,
});

const HomePage = () => {
  return (
    <div>
      <WordDropCanvas />
    </div>
  );
};

export default HomePage;
