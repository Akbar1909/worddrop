"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ChevronDown, Search, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import Logo from "./Logo";
import AuthModal from "./AuthModal";

interface HeaderClientProps {
  user: any;
}

export default function HeaderClient({ user }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isLoggedIn = !!user;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Logo className="w-8 h-8 mr-2 text-[var(--primary-color)]" />
            <span className="gradient-text">Catch Words</span>
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
            {isLoggedIn ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors bg-[var(--primary-color)] bg-opacity-10 rounded-full px-4 py-2"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">{user?.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors bg-[var(--primary-color)] bg-[var(--secondary-color)] rounded-full px-4 py-2"
              >
                <LogIn className="w-5 h-5" />
                <span className="font-medium">Login</span>
              </button>
            )}
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
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[var(--primary-color)] hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <form onSubmit={handleSearch} className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a word..."
              className="w-full px-4 py-2 rounded-full border-2 border-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[var(--primary-color)] text-white p-2 rounded-full hover:bg-[var(--primary-dark)] transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
