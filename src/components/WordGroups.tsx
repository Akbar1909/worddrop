"use client";

import { useState } from "react";
import {
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  Tag,
  Book,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Favorites",
      emoji: "⭐",
      words: [
        {
          id: "1",
          text: "Example",
          partOfSpeech: "noun",
          level: "easy",
          tags: ["sample"],
          emoji: "📋",
        },
        {
          id: "2",
          text: "Test",
          partOfSpeech: "verb",
          level: "medium",
          tags: ["exam"],
          emoji: "✅",
        },
        {
          id: "3",
          text: "Word",
          partOfSpeech: "noun",
          level: "easy",
          tags: ["language"],
          emoji: "💬",
        },
      ],
    },
    {
      id: "2",
      name: "Difficult Words",
      emoji: "🧠",
      words: [
        {
          id: "4",
          text: "Ephemeral",
          partOfSpeech: "adjective",
          level: "hard",
          tags: ["temporary"],
          emoji: "⏳",
        },
        {
          id: "5",
          text: "Ubiquitous",
          partOfSpeech: "adjective",
          level: "hard",
          tags: ["everywhere"],
          emoji: "🌍",
        },
        {
          id: "6",
          text: "Paradigm",
          partOfSpeech: "noun",
          level: "medium",
          tags: ["model"],
          emoji: "🔄",
        },
      ],
    },
  ]);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newWord, setNewWord] = useState({
    text: "",
    partOfSpeech: "",
    level: "medium" as const,
    tags: "",
    emoji: "",
  });
  const [addingToGroup, setAddingToGroup] = useState<string | null>(null);

  const toggleGroup = (groupId: string) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };

  const removeWord = (groupId: string, wordId: string) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? { ...group, words: group.words.filter((w) => w.id !== wordId) }
          : group
      )
    );
  };

  const addGroup = () => {
    if (newGroupName.trim()) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      setGroups([
        ...groups,
        {
          id: Date.now().toString(),
          name: newGroupName,
          emoji: randomEmoji,
          words: [],
        },
      ]);
      setNewGroupName("");
    }
  };

  const addWordToGroup = (groupId: string) => {
    if (newWord.text.trim()) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      setGroups(
        groups.map((group) =>
          group.id === groupId
            ? {
                ...group,
                words: [
                  ...group.words,
                  {
                    ...newWord,
                    id: Date.now().toString(),
                    tags: newWord.tags.split(",").map((tag) => tag.trim()),
                    emoji: randomEmoji,
                  },
                ],
              }
            : group
        )
      );
      setNewWord({
        text: "",
        partOfSpeech: "",
        level: "medium",
        tags: "",
        emoji: "",
      });
      setAddingToGroup(null);
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
      className="space-y-6 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-blue-600 mb-4 flex items-center">
        <Book className="mr-2" />
        Word Groups
      </h2>

      {/* Add new group */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New group name"
          className="flex-grow p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addGroup}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus className="mr-1" /> Add Group
        </motion.button>
      </div>

      {/* Display groups */}
      <AnimatePresence>
        {groups.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100"
          >
            <motion.button
              whileHover={{ backgroundColor: "#f0f9ff" }}
              onClick={() => toggleGroup(group.id)}
              className="w-full p-4 text-left flex justify-between items-center"
            >
              <span className="text-xl font-semibold text-blue-600 flex items-center">
                <span className="mr-2">{group.emoji}</span>
                {group.name}
              </span>
              {expandedGroup === group.id ? <ChevronUp /> : <ChevronDown />}
            </motion.button>

            <AnimatePresence>
              {expandedGroup === group.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-blue-50"
                >
                  <ul className="space-y-2">
                    {group.words.map((word) => (
                      <motion.li
                        key={word.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex flex-wrap justify-between items-center bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <span className="font-medium flex items-center">
                            <span className="mr-1">{word.emoji}</span>
                            {word.text}
                          </span>
                          <span className="text-sm text-gray-600">
                            {word.partOfSpeech}
                          </span>
                          <span
                            className={`${getLevelColor(
                              word.level
                            )} text-white text-xs px-2 py-1 rounded-full`}
                          >
                            {word.level}
                          </span>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                          <div className="flex flex-wrap gap-1 mr-2">
                            {word.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center"
                              >
                                <Tag size={10} className="mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeWord(group.id, word.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Add word to group */}
                  {addingToGroup === group.id ? (
                    <div className="mt-4 space-y-2 bg-white p-4 rounded-md shadow-sm">
                      <input
                        type="text"
                        value={newWord.text}
                        onChange={(e) =>
                          setNewWord({ ...newWord, text: e.target.value })
                        }
                        placeholder="New word"
                        className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={newWord.partOfSpeech}
                        onChange={(e) =>
                          setNewWord({
                            ...newWord,
                            partOfSpeech: e.target.value,
                          })
                        }
                        placeholder="Part of speech"
                        className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={newWord.level}
                        onChange={(e) =>
                          setNewWord({
                            ...newWord,
                            level: e.target.value as "easy" | "medium" | "hard",
                          })
                        }
                        className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                      <input
                        type="text"
                        value={newWord.tags}
                        onChange={(e) =>
                          setNewWord({ ...newWord, tags: e.target.value })
                        }
                        placeholder="Tags (comma-separated)"
                        className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addWordToGroup(group.id)}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                      >
                        <Plus className="mr-1" /> Add Word
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAddingToGroup(group.id)}
                      className="mt-4 flex items-center text-blue-500 hover:text-blue-600 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Plus size={18} className="mr-1" /> Add word
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
