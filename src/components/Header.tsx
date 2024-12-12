"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const totalScore = 1250; // This would come from your state management or API

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchTerm);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Logo className="w-8 h-8 mr-2 text-[var(--primary-color)]" />
            <span className="gradient-text">Recall Words</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/groups"
              className="text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors"
            >
              Groups
            </Link>
            <Link
              href="/game"
              className="text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors"
            >
              Game
            </Link>
            <Link
              href="/leaderboard"
              className="text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors"
            >
              Leaderboard
            </Link>
          </nav>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors bg-[var(--primary-color)] bg-opacity-10 rounded-full px-4 py-2"
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
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[var(--primary-color)] hover:text-white transition-colors"
                  >
                    Profile
                  </Link>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[var(--primary-color)] hover:text-white transition-colors"
                  >
                    Logout
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
