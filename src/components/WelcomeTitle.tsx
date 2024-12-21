"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Brain, Zap } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: BookOpen, text: "Expand your vocabulary" },
  { icon: Brain, text: "Enhance your language skills" },
  { icon: Zap, text: "Learn through interactive games" },
];

export default function WelcomeTitle() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[var(--primary-color)] py-16 pt-10 px-4 rounded-[24px]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          style={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900"
        >
          Welcome to{" "}
          <span className="text-[var(--secondary-color)]">Recall Words</span>
        </motion.h1>
        <motion.p
          style={{ opacity: 1, y: 0 }}
          className="text-xl text-gray-600 mb-8"
        >
          Your journey to language mastery starts here
        </motion.p>

        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-[24px] shadow-lg p-6 w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                style={{ opacity: 1, x: 0 }}
                className="flex items-center justify-center"
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index === currentFeature ? "" : "hidden"
                    }`}
                  >
                    <feature.icon className="w-8 h-8 text-[var(--primary-color)] mr-4" />
                    <span className="text-lg text-gray-800">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          style={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/groups"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold  bg-[var(--primary-color)] rounded-full hover:bg-[var(--primary-dark)] transition-colors duration-300 text-black"
          >
            Explore Groups
          </Link>
          <Link
            href="/game"
            className="inline-flex items-center px-6 py-3 text-lg font-semibold bg-[var(--primary-color)] rounded-full hover:bg-[var(--primary-dark)] transition-colors duration-300 text-black"
          >
            Play Games
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
