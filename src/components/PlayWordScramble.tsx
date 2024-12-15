"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Word {
  id: string;
  text: string;
  emoji: string;
}

interface Group {
  id: string;
  name: string;
  emoji: string;
  words: Word[];
}

interface PlayWordScrambleProps {
  group: Group;
  onClose: () => void;
}

export default function PlayWordScramble({
  group,
  onClose,
}: PlayWordScrambleProps) {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [scrambledWord, setScrambledWord] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (group.words.length > 0) {
      const randomWord =
        group.words[Math.floor(Math.random() * group.words.length)];
      setCurrentWord(randomWord);
      setScrambledWord(scrambleWord(randomWord.text));
    }
  }, [group]);

  const scrambleWord = (word: string) => {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userGuess.toLowerCase() === currentWord?.text.toLowerCase()) {
      setMessage("Correct! 🎉");
    } else {
      setMessage("Try again!");
    }
    setUserGuess("");
  };

  const handleNextWord = () => {
    const randomWord =
      group.words[Math.floor(Math.random() * group.words.length)];
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(randomWord.text));
    setMessage("");
  };

  if (!currentWord) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-600">
            {group.emoji} {group.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-2xl font-bold text-center mb-4">{scrambledWord}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Your guess"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
        {message && <p className="text-center mt-4 font-semibold">{message}</p>}
        <button
          onClick={handleNextWord}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Next Word
        </button>
      </div>
    </motion.div>
  );
}
