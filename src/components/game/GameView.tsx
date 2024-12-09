import { useState } from "react";
import { motion } from "framer-motion";

interface GameViewProps {
  scrambledWord: string;
  onGuess: (guess: string) => void;
}

export default function GameView({ scrambledWord, onGuess }: GameViewProps) {
  const [userGuess, setUserGuess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuess(userGuess);
    setUserGuess("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Unscramble the word:
      </h2>
      <motion.p
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        className="text-5xl font-bold mb-8 text-gray-800 tracking-wide"
      >
        {scrambledWord}
      </motion.p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          className="w-full p-3 text-lg border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your guess..."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors shadow-md"
        >
          Submit Guess
        </motion.button>
      </form>
    </motion.div>
  );
}
