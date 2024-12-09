import { motion } from "framer-motion";

interface ResultViewProps {
  score: {
    correct: number;
    incorrect: number;
    total: number;
  };
  onPlayAgain: () => void;
}

export default function ResultView({ score, onPlayAgain }: ResultViewProps) {
  const percentage = (score.correct / score.total) * 100;

  const getEmoji = () => {
    if (percentage >= 80) return "🏆";
    if (percentage >= 60) return "🌟";
    if (percentage >= 40) return "👍";
    return "📚";
  };

  const getMessage = () => {
    if (percentage >= 80) return "Excellent job!";
    if (percentage >= 60) return "Great effort!";
    if (percentage >= 40) return "Good try!";
    return "Keep practicing!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Game Results</h2>
      <div className="space-y-4 mb-8">
        <p className="text-xl">
          <span className="font-semibold text-green-500">Correct:</span>{" "}
          {score.correct}
        </p>
        <p className="text-xl">
          <span className="font-semibold text-red-500">Incorrect:</span>{" "}
          {score.incorrect}
        </p>
        <p className="text-xl">
          <span className="font-semibold text-gray-600">Total:</span>{" "}
          {score.total}
        </p>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-6xl mb-6"
      >
        {getEmoji()}
      </motion.div>
      <p className="text-2xl font-semibold mb-8 text-gray-700">
        {getMessage()}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayAgain}
        className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg"
      >
        Play Again
      </motion.button>
    </motion.div>
  );
}
