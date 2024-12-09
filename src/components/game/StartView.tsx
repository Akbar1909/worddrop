import { motion } from "framer-motion";

interface StartViewProps {
  onStart: () => void;
}

export default function StartView({ onStart }: StartViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold mb-6 text-blue-600">
        Word Scramble Challenge
      </h2>
      <p className="mb-8 text-lg text-gray-600">
        Unscramble words to test your vocabulary skills!
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors shadow-lg"
      >
        Start Game
      </motion.button>
    </motion.div>
  );
}
