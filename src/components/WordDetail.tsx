"use client";

import { useState } from "react";
import { Plus, Bookmark, ImageIcon, Tag, Book } from "lucide-react";
import { motion } from "framer-motion";

interface WordDetailProps {
  word?: {
    text: string;
    partOfSpeech: string;
    level: "easy" | "medium" | "hard";
    tags: string[];
    definitions: string[];
    examples: string[];
    emoji: string;
  };
}

export default function WordDetail({
  word = {
    text: "Example",
    partOfSpeech: "noun",
    level: "medium",
    tags: ["sample", "test"],
    definitions: [
      "The first definition of the word.",
      "The second definition of the word.",
    ],
    examples: [
      "An example sentence using the word.",
      "Another example sentence using the word.",
    ],
    emoji: "📋",
  },
}: WordDetailProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToGroup = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-blue-600 mr-4 flex items-center">
          <span className="mr-2">{word.emoji}</span>
          {word.text}
        </h2>
        <div className="flex flex-wrap items-center mt-2 sm:mt-0">
          <span className="text-gray-600 mr-2">{word.partOfSpeech}</span>
          <span
            className={`${getLevelColor(
              word.level
            )} text-white text-sm px-2 py-1 rounded-full`}
          >
            {word.level}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {word.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center"
          >
            <Tag size={12} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-500 flex items-center">
          <Book className="mr-2" />
          Definitions
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {word.definitions.map((definition, index) => (
            <li key={index}>{definition}</li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-500 flex items-center">
          <Book className="mr-2" />
          Examples
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {word.examples.map((example, index) => (
            <li key={index}>{example}</li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden"
        >
          <ImageIcon className="absolute inset-0 m-auto text-gray-400 w-12 h-12" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden"
        >
          <ImageIcon className="absolute inset-0 m-auto text-gray-400 w-12 h-12" />
        </motion.div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToGroup}
        className={`flex items-center justify-center w-full p-3 rounded-full text-white font-semibold transition-colors ${
          isAdded ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isAdded ? <Bookmark className="mr-2" /> : <Plus className="mr-2" />}
        {isAdded ? "Added to Group" : "Add to Group"}
      </motion.button>
    </motion.div>
  );
}
