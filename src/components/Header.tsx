"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const totalScore = 1250; // This would come from your state management or API

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Logo className="w-8 h-8 mr-2 text-blue-500" />
          <span className="gradient-text">Catch Words</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/search"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            Search
          </Link>
          <Link
            href="/groups"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            Groups
          </Link>
          <Link
            href="/game"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            Game
          </Link>
          <Link
            href="/leaderboard"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            Leaderboard
          </Link>
        </nav>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 transition-colors bg-blue-50 rounded-full px-4 py-2"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">{totalScore}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                >
                  Profile
                </Link>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                >
                  Logout
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
