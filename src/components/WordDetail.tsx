"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Bookmark,
  Tag,
  Volume2,
  Mic,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { returnArray } from "@/utils/common";

interface WordDetailProps {
  word?: {
    text: string;
    partOfSpeech: string;
    level: "easy" | "medium" | "hard";
    tags: string[];
    definitions: Array<{
      definition: string;
      example: string;
      images: string[];
    }>;
    emoji: string;
    pronunciation: string;
  };
}

export default function WordDetail({
  partOfSpeech = "noun",
  level = "medium",
  tags = ["sample", "test"],
  definitions = [],
  word,
  emoji = "📋",
  difficulty,
  category,
}: any) {
  const [isAdded, setIsAdded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<"good" | "bad" | null>(null);

  const handleAddToGroup = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handlePlayPronunciation = () => {
    setIsPlaying(true);
    // Simulating audio playback
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleRecordPronunciation = () => {
    setIsRecording(true);
    // Simulating recording
    setTimeout(() => setIsRecording(false), 3000);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-emerald-500";
      case "medium":
        return "bg-amber-500";
      case "hard":
        return "bg-rose-500";
      default:
        return "bg-slate-500";
    }
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-3xl font-bold gradient-text mb-2 sm:mb-0 flex items-center">
          {/* <span className="mr-2">{word.emoji}</span> */}
          {word}
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-sm">{word.partOfSpeech}</span>
          <span
            className={`${getLevelColor(
              difficulty
            )} text-white text-xs px-2 py-1 rounded-full`}
          >
            {difficulty}
          </span>
        </div>
      </div>
      {/* <div className="flex items-center space-x-4 mb-4">
        <p className="text-gray-600 italic">{word.pronunciation}</p>
        <button
          onClick={handlePlayPronunciation}
          className={`p-2 rounded-full ${
            isPlaying
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-600"
          } hover:bg-blue-200 transition-colors`}
        >
          <Volume2 size={20} />
        </button>
        <button
          onClick={handleRecordPronunciation}
          className={`p-2 rounded-full ${
            isRecording
              ? "bg-red-100 text-red-600 animate-pulse"
              : "bg-gray-100 text-gray-600"
          } hover:bg-red-200 transition-colors`}
        >
          <Mic size={20} />
        </button>
      </div> */}
      <div className="flex flex-wrap gap-2 mb-6">
        {returnArray(definitions)
          .map((item) => item.category?.category)
          .map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center"
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
      </div>
      <div className="space-y-8">
        {definitions.map((item, definitionIndex) => (
          <motion.div
            key={definitionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: definitionIndex * 0.1 }}
            className="border-b border-blue-100 pb-6 last:border-b-0 last:pb-0"
          >
            <p className="text-lg font-medium text-gray-800 mb-2">
              {definitionIndex + 1}. {item.definition}
            </p>
            {returnArray(item.examples).map((example, i) => {
              return (
                <div key={i} className="mb-4">
                  <p
                    key={i}
                    className="text-gray-600 italic mb-4 pl-4 border-l-2 border-blue-300"
                  >
                    "{example.example}"
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {returnArray(example.files).map((image, imageIndex) => (
                      <motion.div
                        key={imageIndex}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <Image
                          src={`${process.env.SERVER_URL}/upload/serve/${image.originalName}`}
                          alt={`Example image ${imageIndex + 1} for ${
                            word.text
                          }`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFeedback("good")}
            className={`p-2 rounded-full ${
              feedback === "good"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            } hover:bg-green-200 transition-colors`}
          >
            <ThumbsUp size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFeedback("bad")}
            className={`p-2 rounded-full ${
              feedback === "bad"
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            } hover:bg-red-200 transition-colors`}
          >
            <ThumbsDown size={20} />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToGroup}
          className={`flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium transition-colors ${
            isAdded ? "bg-emerald-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isAdded ? (
            <Bookmark className="mr-2" size={18} />
          ) : (
            <Plus className="mr-2" size={18} />
          )}
          <span>{isAdded ? "Added to Group" : "Add to Group"}</span>
        </motion.button>
      </div>
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-4 p-2 rounded-lg text-center ${
              feedback === "good"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {feedback === "good"
              ? "Thanks for the positive feedback!"
              : "We'll work on improving this."}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
