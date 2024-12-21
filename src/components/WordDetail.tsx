"use client";

import { useState } from "react";
import { Plus, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { returnArray } from "@/utils/common";
import GroupSelectionModal from "./GroupSelectionModal";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

interface Example {
  en: string;
  uz: string;
}

interface Definition {
  id: string;
  definition: string;
  examples: Example[];
  images: string[];
}

interface WordDetailProps {
  word?: {
    text: string;
    partOfSpeech: string;
    level: "easy" | "medium" | "hard";
    tags: string[];
    definitions: Definition[];
    emoji: string;
    pronunciation: string;
  };
}

export default function WordDetail({
  word,
  partOfSpeech,
  difficulty,
  id,
  definitions,
}: // emoji: "🍀",
// pronunciation: "ˌser.ənˈdɪp.ə.ti",

WordDetailProps) {
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [feedback, setFeedback] = useState<"good" | "bad" | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "uz">("en");

  const handleAddToGroup = (definitionId: string) => {
    setSelectedDefinition({ wordId: id, id: definitionId });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-emerald-500";
      case "medium":
        return "bg-amber-500";
      case "hard":
        return "bg-rose-500";
      default:
        return "bg-slate-500";
    }
  };

  function speak(text: string) {
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice

    // Speak the text
    speechSynthesis.speak(utterance);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-black border-[1px] shadow-md p-6 max-w-3xl mx-auto  rounded-[24px]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2
            onClick={speak}
            className="text-3xl font-bold text-gray-800 mb-2 sm:mb-0 flex items-center"
          >
            {/* <span className="mr-2">{word.emoji}</span> */}
            {word}
          </h2>
          <div className="flex items-center space-x-2">
            <button onClick={() => speak(word)}>
              <HiOutlineSpeakerWave />
            </button>
            <span className="text-gray-600 text-sm">{partOfSpeech}</span>
            <span
              className={`${getLevelColor(
                difficulty
              )} text-white text-xs px-2 py-1 rounded-full`}
            >
              {difficulty}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4"></div>

        <div className="space-y-8">
          {returnArray(definitions).map((item, definitionIndex) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: definitionIndex * 0.1 }}
              className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-lg font-medium text-gray-800 flex-grow">
                  {definitionIndex + 1}. {item.uz}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToGroup(item.id)}
                  className="flex items-center justify-center p-1 rounded-full text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors ml-2"
                >
                  <Plus size={16} color="black" />
                  <span className="sr-only">Add to Group</span>
                </motion.button>
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {returnArray(item.files).map((image, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      whileHover={{ scale: 1.05 }}
                      className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <Image
                        alt={`Illustration for ${word}`}
                        layout="fill"
                        objectFit="cover"
                        src={`${process.env.SERVER_URL}/upload/serve/${image.originalName}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-gray-600">
                    Examples:
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedLanguage("en")}
                      className={`px-2 py-1 rounded ${
                        selectedLanguage === "en"
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setSelectedLanguage("uz")}
                      className={`px-2 py-1 rounded ${
                        selectedLanguage === "uz"
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      UZ
                    </button>
                  </div>
                </div>
                {item.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="mb-2">
                    <p className="text-gray-600 italic pl-4 border-l-2 border-[var(--primary-color)] flex items-center gap-2">
                      <button onClick={() => speak(example[selectedLanguage])}>
                        <HiOutlineSpeakerWave />
                      </button>
                      "{example[selectedLanguage]}"
                    </p>
                    {selectedLanguage === "en" && (
                      <p className="text-gray-500 text-sm mt-1 pl-4">
                        {example.uz}
                      </p>
                    )}
                    {selectedLanguage === "uz" && (
                      <p className="text-gray-500 text-sm mt-1 pl-4">
                        {example.en}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setFeedback("good")}
              className={`p-2 rounded-full ${
                feedback === "good"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600"
              } hover:bg-green-600 transition-colors`}
            >
              <ThumbsUp size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setFeedback("bad")}
              className={`p-2 rounded-full ${
                feedback === "bad"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-600"
              } hover:bg-red-600 transition-colors`}
            >
              <ThumbsDown size={20} />
            </motion.button>
          </div>
        </div>
        {/* <GroupSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectGroup={handleSelectGroup}
        onCreateGroup={handleCreateGroup}
        groups={groups}
      /> */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-4 p-2 rounded-lg text-center ${
                feedback === "good"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {feedback === "good"
                ? "Thanks for the positive feedback!"
                : "We'll work on improving this."}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <GroupSelectionModal
        isOpen={Boolean(selectedDefinition)}
        onClose={() => setSelectedDefinition(null)}
        definitionId={selectedDefinition?.id}
      />
    </>
  );
}
