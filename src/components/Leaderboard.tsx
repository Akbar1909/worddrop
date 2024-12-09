"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";

const leaderboardData = [
  { id: 1, name: "John Doe", score: 1500 },
  { id: 2, name: "Jane Smith", score: 1450 },
  { id: 3, name: "Bob Johnson", score: 1400 },
  { id: 4, name: "Alice Williams", score: 1350 },
  { id: 5, name: "Charlie Brown", score: 1300 },
];

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState("weekly");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Leaderboard
      </h2>
      <div className="flex justify-center space-x-4 mb-6">
        {["daily", "weekly", "monthly"].map((tf) => (
          <motion.button
            key={tf}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-full ${
              timeframe === tf
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tf.charAt(0).toUpperCase() + tf.slice(1)}
          </motion.button>
        ))}
      </div>
      <ul className="space-y-4">
        {leaderboardData.map((user, index) => (
          <motion.li
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between bg-blue-50 p-4 rounded-lg"
          >
            <div className="flex items-center">
              {index === 0 && <Trophy className="text-yellow-500 mr-2" />}
              {index === 1 && <Medal className="text-gray-500 mr-2" />}
              {index === 2 && <Medal className="text-orange-500 mr-2" />}
              <span className="font-semibold">{user.name}</span>
            </div>
            <span className="text-blue-500 font-bold">{user.score}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
