"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Star } from "lucide-react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndoe123",
    phoneNumber: "+1 (555) 123-4567",
    score: 1250,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center"
        >
          <User size={64} className="text-blue-500" />
        </motion.div>
        <h2 className="text-2xl font-bold text-blue-600">{user.name}</h2>
        <p className="text-gray-600">@{user.username}</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Phone className="text-blue-500" />
          <span>{user.phoneNumber}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-500" />
          <span>Total Score: {user.score}</span>
        </div>
      </div>
    </motion.div>
  );
}
