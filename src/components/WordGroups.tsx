"use client";

import { useState } from "react";
import { Plus, Tag, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PlayWordScramble from "./PlayWordScramble";
import useGetWordGroups from "@/hooks/endpoints/useGetWordGroups";
import { returnArray } from "@/utils/common";
import { request } from "@/services/request";
import useAppMutation from "@/hooks/useAppMutation";
import Link from "next/link";

interface Word {
  id: string;
  text: string;
  partOfSpeech: string;
  level: "easy" | "medium" | "hard";
  tags: string[];
  emoji: string;
}

interface Group {
  id: string;
  name: string;
  emoji: string;
  words: Word[];
}

const emojis = ["📚", "🧠", "🔤", "🗣️", "✍️", "🎓", "📝", "🖊️", "📖", "🔍"];

export default function WordGroups() {
  const { groups, refetch } = useGetWordGroups();

  const [newGroupName, setNewGroupName] = useState("");
  const [playingGroup, setPlayingGroup] = useState<string | null>(null);

  const { mutate } = useAppMutation({
    mutationFn: (body) => request.post("/word-group", body),
    mutationKey: ["create-word-group"],
    onSuccess: () => {
      setNewGroupName("");
      refetch();
    },
  });

  const addGroup = () => {
    if (newGroupName.trim()) {
      mutate({ wordGroupName: newGroupName });
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl  space-y-6 max-w-md mx-auto px-4 font-bold text-[var(--secondary-color)] mb-4 flex items-center justify-center">
        Word Groups
      </h2>

      {/* Add new group */}
      <div className="flex space-x-2 mb-4 max-w-md mx-auto">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New group name"
          className="flex-grow p-2 border  border-black rounded-[24px] focus:outline-none focus:ring-2 "
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addGroup}
          className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] rounded-md transition-colors flex items-center justify-center"
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Display groups */}
      <div className="grid gap-x-4 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg overflow-hidden border-[2px] border-black "
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold  flex items-center">
                  <span className="mr-2">{group.emoji}</span>
                  {group.word_group}
                </h3>
                <Link href={`/groups/${group.id}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                >
                  <Play size={20} />
                </motion.button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {returnArray(group.words).map((word) => (
                  <motion.div
                    key={word.id}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center  p-2 rounded-md"
                  >
                    <span className="mr-1">{word.emoji}</span>
                    <span className="font-medium">{word.text}</span>
                    <span
                      className={`${getLevelColor(
                        word.level
                      )} ml-2 w-2 h-2 rounded-full`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {playingGroup && (
          <PlayWordScramble
            group={groups.find((g) => g.id === playingGroup)!}
            onClose={() => setPlayingGroup(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
