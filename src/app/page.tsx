"use client";
import dynamic from "next/dynamic";
import React from "react";

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
