"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Star, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const totalScore = 1250; // This would come from your state management or API

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Logo className="w-10 h-10 mr-2" />
          <span className="hidden sm:inline">Recall Words</span>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/search"
                className="hover:text-blue-200 transition-colors"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/groups"
                className="hover:text-blue-200 transition-colors"
              >
                Groups
              </Link>
            </li>
            <li>
              <Link
                href="/game"
                className="hover:text-blue-200 transition-colors"
              >
                Game
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="hover:text-blue-200 transition-colors"
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 hover:bg-opacity-30 transition-colors"
          >
            <User className="w-6 h-6" />
            <span>{totalScore}</span>
            <Star className="w-6 h-6 text-yellow-300" />
            <ChevronDown className="w-4 h-4" />
          </button>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
            >
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
