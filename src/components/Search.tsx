"use client";

import { useState, ReactNode, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { motion } from "framer-motion";
import useAppNavigation from "@/hooks/useAppNavigation";

interface SearchProps {
  children: ReactNode;
  initialValue: string;
}

export default function Search({ children, initialValue }: SearchProps) {
  const { searchParams, pushToRouter, createQueryParams } = useAppNavigation();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") || ""
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            const { value } = e.target;

            setSearchTerm(value);
            const params = createQueryParams();
            if (value) {
              params.set("search", value);
            } else {
              params.delete("search");
            }

            pushToRouter(params);
          }}
          placeholder="Search for a word..."
          className="w-full p-4 pl-12 text-lg rounded-full border-[var(--primary-color)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent bg-white shadow-md border-[1px] border-black"
        />
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--primary-color)] w-6 h-6" />
      </div>
      {children}
    </motion.div>
  );
}
