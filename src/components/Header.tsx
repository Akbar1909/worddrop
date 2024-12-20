"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import AuthModal from "./AuthModal";
import useGetMe from "@/hooks/endpoints/useGetMe";
import Show from "./Show";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { me, hasToken } = useGetMe();

  return (
    <header className="bg-[var(--primary-color)] py-4 h-[72px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold flex items-center">
            <Logo className="w-6 h-6 mr-2" />
            <span className="text-gray-900">Recall</span>
            <span className="text-gray-400 ml-1">Words</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/groups"
              className="text-gray-600 hover:text-[#ff4f4f] transition-colors"
            >
              Groups
            </Link>
            <Link
              href="/game"
              className="text-gray-600 hover:text-[#ff4f4f] transition-colors"
            >
              Game
            </Link>
            <Link
              href="/leaderboard"
              className="text-gray-600 hover:text-[#ff4f4f] transition-colors"
            >
              Leaderboard
            </Link>
          </nav>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-[var(--secondary-color)] text-white px-6 py-2 rounded-full  transition-colors"
          >
            <Show when={!hasToken}>Login</Show>
            <Show when={hasToken}>{me.username}</Show>
          </button>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
