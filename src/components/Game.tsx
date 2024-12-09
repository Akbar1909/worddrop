"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StartView from "./game/StartView";
import GameView from "./game/GameView";
import ResultView from "./game/ResultView";

const words = [
  "dictionary",
  "language",
  "vocabulary",
  "grammar",
  "pronunciation",
  "thesaurus",
  "etymology",
  "syntax",
  "morphology",
  "phonetics",
];

export default function Game() {
  const [gameState, setGameState] = useState<"start" | "playing" | "result">(
    "start"
  );
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [score, setScore] = useState({ correct: 0, incorrect: 0, total: 0 });

  const scrambleWord = (word: string) => {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const startGame = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setGameState("playing");
  };

  const handleGuess = (guess: string) => {
    if (guess.toLowerCase() === currentWord.toLowerCase()) {
      setScore((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        total: prev.total + 1,
      }));
    } else {
      setScore((prev) => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        total: prev.total + 1,
      }));
    }
    if (score.total + 1 >= 5) {
      setGameState("result");
    } else {
      startGame();
    }
  };

  const resetGame = () => {
    setScore({ correct: 0, incorrect: 0, total: 0 });
    setGameState("start");
  };

  useEffect(() => {
    if (gameState === "playing") {
      startGame();
    }
  }, [gameState]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
      <AnimatePresence mode="wait">
        {gameState === "start" && (
          <StartView key="start" onStart={() => setGameState("playing")} />
        )}
        {gameState === "playing" && (
          <GameView
            key="playing"
            scrambledWord={scrambledWord}
            onGuess={handleGuess}
          />
        )}
        {gameState === "result" && (
          <ResultView key="result" score={score} onPlayAgain={resetGame} />
        )}
      </AnimatePresence>
    </div>
  );
}
